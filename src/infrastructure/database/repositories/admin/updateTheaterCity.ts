import { ICityUpdate } from "../../../../utils/interface";
import { TheaterOwner } from "../../model/theaters";

const updateTheaterCity = async (data: ICityUpdate): Promise<ICityUpdate | null> => {
  try {
    const response = await TheaterOwner.findOneAndUpdate(
      { _id: data._id },
      {
        $set:
          { city: data.city }
      },
      { new: true }
    ).lean()

    if (!response) return null
    const theaterId = response?._id.toString()
    return {
      _id: theaterId,
      city: response.city
    }
  } catch (error) {
    throw error
  }
}

export {
  updateTheaterCity
}