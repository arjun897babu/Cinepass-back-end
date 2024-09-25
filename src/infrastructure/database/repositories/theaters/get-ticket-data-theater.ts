  import { TicketFilter } from "../../../../utils/interface"
import { calculateSkip } from "../../../../utils/FilterAndPagination"
 import { ITheaterTicketDataResponse } from "../../../../domain/domainUsecases/common"
import { Tickets } from "../../model/user/ticket-schema"

const getTheaterTicketData = async (_id: string, pageNumber: number, filter?: TicketFilter):Promise<ITheaterTicketDataResponse> => {

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
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'UserInfo'
        }
      },
      {
        $unwind: 'userInfo'
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
                  paymentId: '$paymentInfo.paymentId'
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

    return ticketData
  } catch (error) {
    throw error
  }

}

export {
  getTheaterTicketData
}