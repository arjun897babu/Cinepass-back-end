import mongoose from "mongoose";
import { BookingStatus, Period } from "../../../../utils/enum";
import { MovieShow, TheaterScreen } from "../../model/theaters"
import { Tickets } from "../../model/user/ticket-schema"
import { IGetScreenCount, IGetShowCountByScreen, IGetTicketCount, IRevenueResponse, RevenueByFilter, RevenueDetails } from "../../../../utils/interface";
import { generateRevenueFilterDate } from "../../../../utils/FilterAndPagination";
import { generatePeriodQuery, generateRevenueFilterQuery, getDefaultData, mergeRevenueData } from "../../../../utils/mongod-query-generator";



const getScreenCount = async (theaterId: string): Promise<IGetScreenCount> => {
  try {
    const [response] = await TheaterScreen.aggregate([
      {
        $match: {
          theaterId: new mongoose.Types.ObjectId(theaterId)
        }
      },
      {
        $facet: {
          total: [

            { $count: 'count' }
          ],
          available: [
            {
              $match: {
                listed: true
              }
            },
            { $count: 'count' }
          ],
          underMaintenance: [
            {
              $match: {
                listed: false
              }
            },
            { $count: 'count' }
          ],

        }
      },
      {
        $project: {
          total: { $ifNull: [{ $arrayElemAt: ['$total.count', 0] }, 0] },
          available: { $ifNull: [{ $arrayElemAt: ['$available.count', 0] }, 0] },
          'under-maintenance': { $ifNull: [{ $arrayElemAt: ['$underMaintenance.count', 0] }, 0] }
        }
      }
    ])
    return response;

  } catch (error) {
    throw error
  }

}

const getTicketCount = async (theaterId: string): Promise<IGetTicketCount> => {

  try {
    const [response] = await Tickets.aggregate([
      {
        $match: {
          theaterId: theaterId
        }
      },
      {
        $facet: {
          total: [
            {
              $count: 'count'
            }
          ],
          canceled: [
            {
              $match: {
                bookingStatus: BookingStatus.CANCELED
              }
            },
            {
              $count: 'count'
            }
          ],
        }
      },
      {
        $project: {
          total: { $ifNull: [{ $arrayElemAt: ['$total.count', 0] }, 0] },
          canceled: { $ifNull: [{ $arrayElemAt: ['$canceled.count', 0] }, 0] }
        }
      }
    ])
    return response

  } catch (error) {
    throw error
  }
}

const getShowCountByScreen = async (theaterId: string): Promise<IGetShowCountByScreen[]> => {
  try {

    const response = await MovieShow.aggregate([
      {
        $match: {
          theaterId: new mongoose.Types.ObjectId(theaterId)
        }
      },
      {
        $lookup: {
          from: 'theaterscreens',
          localField: 'screenId',
          foreignField: '_id',
          as: 'screen'
        }
      },
      {
        $unwind: '$screen'
      },
      {
        $group: {
          _id: '$screenId',
          screenName: { $first: '$screen.screen_name' },
          showCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          screenName: 1,
          showCount: 1
        }
      }
    ])

    return response

  } catch (error) {
    throw error
  }
}

const getRevenueByScreen = async (theaterId: string, filter: RevenueByFilter):Promise<IRevenueResponse> => {

  const matchDate = generateRevenueFilterDate(filter.period)
  try {

    const defaultScreenId = await TheaterScreen.findOne({}).sort({ screen_name: 1 }).limit(1).select('_id').lean()

    const [response] = await Tickets.aggregate([
      { $match: { theaterId } },
      {
        $addFields: {
          screenObjectId: { $toObjectId: "$screenId" }
        }
      },
      {
        $lookup: {
          from: 'theaterscreens',
          localField: 'screenObjectId',
          foreignField: '_id',
          as: 'screen'
        }
      },
      {
        $unwind: '$screen'
      },
      {
        $sort: {
          'screen.screen_name': 1
        }
      },
      {
        $facet: {
          screenRevenue: [
            {
              $match: {
                bookingDate: matchDate,
                screenId: filter.screenId ?? `${defaultScreenId?._id}`
              }
            },
            {
              $addFields: {
                period: generatePeriodQuery(filter.period)
              }
            },
            {
              $group: {
                _id: {
                  screenId: '$screenId',
                  period: '$period'
                },
                total: { $sum: '$screen.chargePerSeat' },
                screenName: { $first: '$screen.screen_name' },
                screenId: { $first: '$screen._id' },
              },
            },
            {
              $project: {
                _id: 0,
                name: '$screenName',
                id: '$screenId',
                data: generateRevenueFilterQuery(filter.period)
              }
            },
          ],
          screenList: [
            { $group: { _id: { screenId: '$screen._id', screenName: '$screen.screen_name' } } },
            {
              $project: {
                _id: 0,
                id: '$_id.screenId',
                label: '$_id.screenName'
              }
            },
            {
              $sort: { name: 1 }
            }

          ]
        }
      },
      {
        $project: {
          list: '$screenList',
          revenue: '$screenRevenue'
        }
      },
    ])


    const mergedData = mergeRevenueData(response.revenue)
    response.revenue = mergedData

    return response
  } catch (error) {
    throw error
  }
}

export {
  getScreenCount,
  getShowCountByScreen,
  getTicketCount,
  getRevenueByScreen
}



