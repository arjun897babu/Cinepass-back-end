import mongoose from "mongoose";
import { TheaterOwner } from "../../model/theaters";
import { ITheaterDetailResponse } from "../../../../utils/interface";

const getTheaterDetails = async (ownerId: string): Promise<ITheaterDetailResponse | undefined> => {
  try {

    const [theaterDetails] = await TheaterOwner.aggregate<ITheaterDetailResponse | undefined>([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(ownerId)
        },
      },
      {
        $project: {
          password: 0
        }
      }

    ]);
    console.log(theaterDetails)
    return theaterDetails
  } catch (error) {
    throw error;
  }
};

export {
  getTheaterDetails
};
