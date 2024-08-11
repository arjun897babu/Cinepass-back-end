import { ITheaters } from "../../../../domain/entities/theaters";
import { ITheaterUpdateInfoPayload } from "../../../../utils/interface";
import { Theaters } from "../../model/theaters";

const updateTheater = async (_id: string, payload: ITheaterUpdateInfoPayload): Promise<ITheaters | null> => {
  try {
    const updatedTheater = await Theaters.findOneAndUpdate(
      { ownerId: _id },
      {
        $set: {
          address: payload.address,
          theater_license: payload.theater_license,
          theater_Name: payload.theater_name,
          city: payload.city,
          images: payload.images
        }
      },
      { new: true }
    ).lean();

    return updatedTheater ? updatedTheater : null;
  } catch (error) {
    throw error;
  }
};

export {
  updateTheater
};
