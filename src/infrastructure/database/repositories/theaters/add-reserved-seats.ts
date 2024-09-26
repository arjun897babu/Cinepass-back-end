import { IReservedSeats } from "../../../../domain/entities/theaters";
import { MovieShow } from "../../model/theaters";

const addReservedSeats = async (showId: string, data: IReservedSeats) => {
console.log('in add reserved Seats repositories',showId,data)
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