import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { CustomError } from "../../../../utils/CustomError";
import { TheaterOwnerProfile, TheaterProfile } from "../../../../utils/interface";
import { isTheaterOwnerProfile } from "../../../../utils/typeGaurd";
import { TheaterOwner } from "../../model/theaters";

const updateTheater = async (_id: string, payload: TheaterProfile): Promise<ITheaterOwnerEntity | null> => {
  try {


    const isExist = await TheaterOwner.exists({ theater_license: payload.theater_license, _id: { $ne: _id } });
    console.log(isExist)
    if (isExist) {
      throw new CustomError('already registered with this license', 400, 'theater_license')
    }


    const updatedTheater = await TheaterOwner.findOneAndUpdate(
      { _id },
      {
        $set: {
          address: payload.address,
          theater_license: payload.theater_license,
          theater_name: payload.theater_name,
          city: payload.city,
          images: payload.images
        }
      },
      { new: true, }
    )
      .select('-password')
      .lean();

    return updatedTheater ? updatedTheater : null;
  } catch (error) {
    throw error;
  }
};

export {
  updateTheater
};
