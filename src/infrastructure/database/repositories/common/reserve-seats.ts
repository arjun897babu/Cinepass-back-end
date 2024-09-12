import { IReservedSeats } from "../../../../domain/entities/theaters"
import { MovieShow } from "../../model/theaters"

const reserveSeats = async (showId: string, seats: IReservedSeats) => {
  try {
    await MovieShow.findOneAndUpdate(
      { _id: showId },
      {
        seats:
        {
          $push: seats
        }
      },
      {})
  } catch (error) {
    throw error
  }
}