import { Types } from "mongoose"
import { ITheaterScreen } from "../../../../domain/entities/theaters"
import { TheaterScreen } from "../../model/theaters"

const getAllTheaterScreen = async (_id: string, amenity?: string): Promise<ITheaterScreen[] | []> => {
  try {

    console.log(amenity)
    let matchQuery = amenity ? {
      $and: [
        { theaterId: new Types.ObjectId(_id) },
        { amenity }
      ]
    } : { theaterId: new Types.ObjectId(_id) }

    console.log(matchQuery)
    const allScreen = await TheaterScreen.aggregate([
      {
        $match: matchQuery
      }
    ])
    console.log(allScreen)
    return allScreen
  } catch (error) {
    throw error
  }
}

export {
  getAllTheaterScreen
}