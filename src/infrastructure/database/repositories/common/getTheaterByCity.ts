import { Types } from "mongoose";
import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { TheaterOwner } from "../../model/theaters";
import { ApprovalStatus } from "../../../../domain/entities/common";
import { CustomError } from "../../../../utils/CustomError";

const getTheaterByCity = async (city: string): Promise<Pick<ITheaterOwnerEntity, 'theater_name' | 'city' | '_id' | 'slug'>[]> => {
  try {


    const theaterDetails = await TheaterOwner.aggregate([
      {
        $match: {
          $and: [
            { city: { $regex: city, $options: 'i' } },
            { status: true },
            { verified: true },
            { approval_status: ApprovalStatus.APPROVED },
          ]
        }
      },

      {
        $project: {
          password: 0,
          theater_name: 1,
          city: 1,
          _id: 1,
          slug: 1
        }
      }
    ]);

    if (theaterDetails.length === 0) {
      throw new CustomError('No theatres Found', 404, 'theater')
    }

    return theaterDetails
  } catch (error) {
    throw error;
  }
};

export {
  getTheaterByCity
};