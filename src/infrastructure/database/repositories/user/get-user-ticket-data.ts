import { Types } from "mongoose"
import { Tickets } from "../../model/user/ticket-schema"
import { calculateSkip, getMaxPage } from "../../../../utils/FilterAndPagination"
import { TicketFilter } from "../../../../utils/interface"
import { CustomError } from "../../../../utils/CustomError"
import { HttpStatusCode } from "../../../../utils/enum"
import { IUserTicketDataResponse } from "../../../../domain/domainUsecases/common"

const getTicketData = async (_id: string, pageNumber: number, filter?: TicketFilter): Promise<IUserTicketDataResponse> => {

  const limit = 3
  const skip = calculateSkip(pageNumber, limit)
  try {
    const [tickets] = await Tickets.aggregate([
      {
        $match: {
          userId: _id
        }
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
            {
              $sort: { createdAt: -1 }
            },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                TicketInfo: {
                  _id: '$_id',
                  bookingStatus: '$bookingStatus',
                  bookingDate: '$bookingDate',
                  seats: '$seats'
                },
                movieInfo: {
                  movie_name: '$paymentInfo.movie.movie_name',
                  movie_poster: '$paymentInfo.movie.movie_poster',
                  release_date: '$paymentInfo.movie.release_date'
                },
                theaterInfo: {
                  theater_name: '$paymentInfo.theater.theater_name',
                  city: '$paymentInfo.theater.city'

                },
                screenInfo: '$paymentInfo.screen',
                showInfo: '$paymentInfo.showDetail',

                paymentInfo: {
                  _id: '$paymentInfo._id',
                  totalAmount: '$paymentInfo.totalAmount',
                  serviceCharge: '$paymentInfo.serviceCharge',
                  extraCharge: '$paymentInfo.extraCharge',
                  status: '$paymentInfo.status',
                  paymentIntentId: '$paymentInfo.paymentIntentId'
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
    if (!tickets) {
      throw new CustomError('No data found', HttpStatusCode.NOT_FOUND, 'ticket')
    }
    return {
      maxPage: getMaxPage(tickets.totalDocument, limit),
      data: tickets.data
    }

  } catch (error) {
    throw error
  }
}

export {
  getTicketData
}