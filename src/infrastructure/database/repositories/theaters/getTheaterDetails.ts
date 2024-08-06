import mongoose  from "mongoose";
import { Theaters } from "../../model/theaters";
import { ITheaterDetailResponse } from "../../../../utils/interface";

const getTheaterDetails = async (ownerId: string): Promise<ITheaterDetailResponse | undefined> => {
  try {

    const [theaterDetails] = await Theaters.aggregate<ITheaterDetailResponse |undefined>([
      {
        $match: {
          ownerId: new mongoose.Types.ObjectId(ownerId)
        }
      },
      {
        $lookup: {
          from: 'theaterowners',
          localField: 'ownerId',
          foreignField: '_id',
          as: 'owner'
        }
      },
      {
        $unwind: '$owner'
      },
      {
        $project: {
          _id: 1,
          theater_Name: 1,
          theater_license: 1,
          address: 1,
          images: 1,
          city: 1,
          owner: {
            _id: 1,
            name: 1,
            email: 1,
            mobile_number: 1
          }
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
