import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { CustomError } from "../../../../utils/CustomError";
import { Role } from "../../../../utils/enum";
import { uploadImage } from "../../../cloudinary";
import { TheaterOwner } from "../../model/theaters";

const updateTheater = async (_id: string, payload: Partial<ITheaterOwnerEntity>): Promise<ITheaterOwnerEntity | null> => {
  try {


    const isExist = await TheaterOwner.exists({ theater_license: payload.theater_license, _id: { $ne: _id } });

    if (isExist) {
      throw new CustomError('already registered with this license', 400, 'theater_license')
    }

    if (payload.image) {
      const cloud_img_url = await uploadImage(payload.image, Role.theaters);
      payload.image = cloud_img_url
    }

    const updatedTheater = await TheaterOwner.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...payload
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
