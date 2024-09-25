import { IReservedSeats } from "../../../../domain/entities/theaters"
import { MovieShow } from "../../model/theaters"

const removeReservedSeats = async (showId: string, data: IReservedSeats) => {
  try {
    await MovieShow.findByIdAndUpdate({ _id: showId }, {
      $pull: {
        reserved: {
          $and: [
            { bookingDate: data.bookingDate },
            { removeReservedSeats: { $all: data.reservedSeats } }
          ]
        }
      }
    })
  } catch (error) {
    throw error
  }
}

export {
  removeReservedSeats
}