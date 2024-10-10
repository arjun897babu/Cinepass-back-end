import { ApprovalStatus } from "../../../../utils/enum"
import { IGetTheaterOwnersCount, IGetUserCount } from "../../../../utils/interface"
import { TheaterOwner } from "../../model/theaters"
import { Users } from "../../model/user/userSchema"


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
        nonVerified: { $ifNull: [{ $arrayElemAt: ["$nonVerified.count", 0] }, 0] },
        approved: { $ifNull: [{ $arrayElemAt: ["$approved.count", 0] }, 0] },
        rejected: { $ifNull: [{ $arrayElemAt: ["$rejected.count", 0] }, 0] },
        pending: { $ifNull: [{ $arrayElemAt: ["$pending.count", 0] }, 0] }
      }
    }
  ])

  return theaterCount
}


export {
  getUserCount,
  getTheaterOwnersCount
}