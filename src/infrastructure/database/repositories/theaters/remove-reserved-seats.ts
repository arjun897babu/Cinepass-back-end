import { IReservedSeats } from "../../../../domain/entities/theaters"
import { MovieShow } from "../../model/theaters"

const removeReservedSeats = async (showId: string, data: IReservedSeats) => {
  try {
    console.log(showId, data)
    await MovieShow.findByIdAndUpdate({ _id: showId }, {
      $pull: {
        reserved: {
          $and: [
            { bookingDate: data.bookingDate },
            { reservedSeats: { $all: data.reservedSeats } }
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