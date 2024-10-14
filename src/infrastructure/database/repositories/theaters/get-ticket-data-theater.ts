import { TicketFilter } from "../../../../utils/interface"
import { calculateSkip, getMaxPage } from "../../../../utils/FilterAndPagination"
import { ITheaterTicketDataResponse } from "../../../../domain/domainUsecases/common"
import { Tickets } from "../../model/user/ticket-schema"
import { CustomError } from "../../../../utils/CustomError"
import { HttpStatusCode } from "../../../../utils/enum"

const getTheaterTicketData = async (_id: string, pageNumber: number, filter?: TicketFilter): Promise<ITheaterTicketDataResponse> => {
  console.log(_id,pageNumber)
  const limit = 3
  const skip = calculateSkip(pageNumber, limit);

  try {
    const [ticketData] = await Tickets.aggregate([
      {
        $match: {
          theaterId: _id,
        }
      },
      {
        $addFields: {
          userObjId: { $toObjectId: '$userId' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userObjId',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $unwind: '$userInfo'
      },
      {
        $lookup: {
          from: 'payments',
          localField: 'paymentId',
          foreignField: 'paymentIntentId',
          as: 'paymentInfo'
        }
      },
      {
        $unwind: '$paymentInfo'
      },
      {
        $facet: {
          totalDocument: [
            { $count: 'total' }
          ],
          data: [

            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                TicketInfo: {
                  _id: '$_id',
                  bookingStatus: '$bookingStatus',
                  bookingDate: '$bookingDate',
                  seats: '$seats',
                  bookingCode:'$bookingCode'
                },
                movieInfo: '$paymentInfo.movie',
                theaterInfo: '$paymentInfo.theater',
                screenInfo: '$paymentInfo.screen',
                showInfo: '$paymentInfo.showDetail',
                 userInfo: {
                    _id:'$userInfo._id',
                    name:'$userInfo.name',
                    email:'$userInfo.email',
                    mobile_number:'$userInfo.mobile_number',
                    profile_picture:'$userInfo.profile_picture'
                },
                paymentInfo: {
                  _id: '$paymentInfo._id',
                  totalAmount: '$paymentInfo.totalAmount',
                  serviceCharge: '$paymentInfo.serviceCharge',
                  extraCharge: '$paymentInfo.extraCharge',
                  status: '$paymentInfo.status',
                  paymentId: '$paymentInfo.paymentIntentId'
                }
              }
            }
          ]
        }
      },
      {
        $unwind: '$totalDocument'
      },
      {
        $project: {
          totalDocument: '$totalDocument.total',
          data: '$data'
        }
      }
    ])
    // console.log('in get theater ticket data repositories', ticketData)
    if (!ticketData) {
      throw new CustomError('no tickets found', HttpStatusCode.NOT_FOUND, 'tickets')
    }

    return { 
      maxPage: getMaxPage(ticketData.totalDocument, limit),
      data: ticketData.data
    }
  } catch (error) {
    throw error
  }

}

export {
  getTheaterTicketData
}