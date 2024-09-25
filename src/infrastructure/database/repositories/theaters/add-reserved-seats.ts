import { IReservedSeats } from "../../../../domain/entities/theaters";
import { MovieShow } from "../../model/theaters";

const addReservedSeats = async (showId: string, data: IReservedSeats) => {

  try {
    await MovieShow.findByIdAndUpdate(
      { _id: showId },
      {
        $push: { reserved:data }
      }
    )
  } catch (error) {
    throw error
  }
}

export {
  addReservedSeats
}