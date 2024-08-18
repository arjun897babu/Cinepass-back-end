import { Types } from "mongoose";
import { ITheaterDetailResponse } from "../../../../utils/interface";
import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { TheaterOwner } from "../../model/theaters";

const getTheaterDetails = async (ownerId: string): Promise<ITheaterOwnerEntity | undefined> => {
  try {

    const [theaterDetails] = await TheaterOwner.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(ownerId)
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
