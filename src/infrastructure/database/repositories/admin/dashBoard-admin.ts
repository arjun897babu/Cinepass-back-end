import mongoose from "mongoose"
import { TheaterOwner } from "../../model/theaters"
import { payments } from "../../model/user/payment-schema"
import { Users } from "../../model/user/userSchema"
import { generateRevenueFilterDate } from "../../../../utils/FilterAndPagination"
import { generatePeriodQuery, generateRevenueFilterQuery, mergeRevenueData } from "../../../../utils/mongod-query-generator"
import {
  ApprovalStatus,
  PaymentStatus,
  PurchasedItem
} from "../../../../utils/enum"
import {
  IGetTheaterOwnersCount,
  IGetUserCount,
  IRevenueResponse,
  RevenueByFilter,
  RevenueDetails
} from "../../../../utils/interface"


const getUserCount = async (): Promise<IGetUserCount> => {

  const [userCount] = await Users.aggregate([
    {
      $facet: {
        verified: [
          { $match: { verified: true } },
          { $count: "count" }
        ],
        active: [
          { $match: { status: true } },
          { $count: "count" }
        ],
        blocked: [
          { $match: { status: false } },
          { $count: "count" }
        ],
        nonVerified: [
          { $match: { verified: false } },
          { $count: "count" }
        ]
      }
    },
    {
      $project: {
        verified: { $ifNull: [{ $arrayElemAt: ["$verified.count", 0] }, 0] },
        active: { $ifNull: [{ $arrayElemAt: ["$active.count", 0] }, 0] },
        blocked: { $ifNull: [{ $arrayElemAt: ["$blocked.count", 0] }, 0] },
        nonVerified: { $ifNull: [{ $arrayElemAt: ["$nonVerified.count", 0] }, 0] }
      }
    }
  ])

  return userCount
}

const getTheaterOwnersCount = async (): Promise<IGetTheaterOwnersCount> => {
  const [theaterCount] = await TheaterOwner.aggregate([
    {
      $facet: {
        verified: [
          { $match: { verified: true } },
          { $count: "count" }
        ],
        active: [
          { $match: { status: true } },
          { $count: "count" }
        ],
        blocked: [
          { $match: { status: false } },
          { $count: "count" }
        ],
        nonVerified: [
          { $match: { verified: false } },
          { $count: "count" }
        ],
        approved: [
          { $match: { approval_status: ApprovalStatus.APPROVED } },
          { $count: "count" }
        ],
        rejected: [
          { $match: { approval_status: ApprovalStatus.REJECTED } },
          { $count: "count" }
        ],
        pending: [
          { $match: { approval_status: ApprovalStatus.PENDING } },
          { $count: "count" }
        ]

      }
    },
    {
      $project: {
        verified: { $ifNull: [{ $arrayElemAt: ["$verified.count", 0] }, 0] },
        active: { $ifNull: [{ $arrayElemAt: ["$active.count", 0] }, 0] },
        blocked: { $ifNull: [{ $arrayElemAt: ["$blocked.count", 0] }, 0] },
        'non-verified': { $ifNull: [{ $arrayElemAt: ["$nonVerified.count", 0] }, 0] },
        approved: { $ifNull: [{ $arrayElemAt: ["$approved.count", 0] }, 0] },
        rejected: { $ifNull: [{ $arrayElemAt: ["$rejected.count", 0] }, 0] },
        pending: { $ifNull: [{ $arrayElemAt: ["$pending.count", 0] }, 0] }
      }
    }
  ])

  return theaterCount
}

const getRevenueByStreamingMovie = async (filter: RevenueByFilter): Promise<IRevenueResponse> => {

  if (!filter?.movieId) {
    const defaultMovieId = await payments.findOne({
      $and: [
        { purchasedItem: PurchasedItem.RENTAL },
        { status: PaymentStatus.PAID }
      ]
    })
      .sort({ 'movie.movie_name': 1 })
      .limit(1)
      .select('-_id movieId')
      .lean()

    if (defaultMovieId) {
      filter.movieId = defaultMovieId.movieId.toString()
    }
  }

  const matchDate = generateRevenueFilterDate(filter.period)

  const [response] = await payments.aggregate([

    {
      $lookup: {
        from: 'streamingmovies',
        localField: 'movieId',
        foreignField: '_id',
        as: 'movieData'
      }
    },
    {
      $unwind: '$movieData'
    },
    {
      $sort: { 'movieData.movie_name': 1 }
    },

    {
      $addFields: {
        period: generatePeriodQuery(filter.period)
      }
    },
    {
      $facet: {
        list: [
          {
            $match: {
              $and: [
                { purchasedItem: PurchasedItem.RENTAL },
                { status: PaymentStatus.PAID }
              ]
            }
          },
          {
            $group: {
              _id: {
                movieId: '$movieData._id',
                movieName: '$movieData.movie_name',
              },
            }
          },
          {
            $project: {
              _id: 0,
              id: '$_id.movieId',
              label: '$_id.movieName'
            }
          }
        ],
        revenue: [
          {
            $match: {
              $and: [
                { movieId: new mongoose.Types.ObjectId(filter.movieId) },
                { bookingDate: matchDate },
                { purchasedItem: PurchasedItem.RENTAL },
                { status: PaymentStatus.PAID }
              ]
            }
          },
          {
            $group: {
              _id: {
                movieId: '$movieId',
                period: '$period'
              },
              total: { $sum: '$totalAmount' },
              movieName: { $first: '$movieData.movie_name' },
              movieId: { $first: '$movieData._id' },
            }
          },
          {
            $project: {
              _id: 0,
              name: '$movieName',
              id: '$movieId',
              data: generateRevenueFilterQuery(filter.period)
            }
          }
        ]
      }
    },
  ]);
  const mergedData = mergeRevenueData(response.revenue)
  response.revenue = mergedData
  return response
}


export {
  getRevenueByStreamingMovie,
  getUserCount,
  getTheaterOwnersCount
}