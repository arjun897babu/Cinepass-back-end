import { Types } from "mongoose";
import { ITheaterDetailResponse } from "../../../../utils/interface";
import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { TheaterOwner } from "../../model/theaters";
import { ApprovalStatus } from "../../../../domain/entities/common";

const getTheaterDetails = async (ownerId: string): Promise<ITheaterOwnerEntity > => {
  try {
    console.log('getTheater for theater owner respository : ',ownerId)

    const [theaterDetails] = await TheaterOwner.aggregate([
      {
        $match: {
          $and: [

            { _id: new Types.ObjectId(ownerId) },
            { status: true },
            { verified: true },
            { approval_status: ApprovalStatus.APPROVED },

          ]
        }
      },

      {
        $project: {
          password: 0
        }
      }
    ]);

    return theaterDetails
  } catch (error) {
    throw error;
  }
};

export {
  getTheaterDetails
};
