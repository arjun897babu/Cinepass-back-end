import { Types } from "mongoose"
import { ITheaterScreen } from "../../../../domain/entities/theaters"
import { TheaterScreen } from "../../model/theaters"

const getAllTheaterScreen = async (_id: string, amenity?: string): Promise<ITheaterScreen[] | []> => {
  try {
 
    let matchQuery = amenity ? {
      $and: [
        { theaterId: new Types.ObjectId(_id) },
        { amenity },
        { listed: true }
      ]
    } : { theaterId: new Types.ObjectId(_id), listed: true }

 
    const allScreen = await TheaterScreen.aggregate([
      {
        $match: matchQuery
      }
    ])
    
    return allScreen
  } catch (error) {
    throw error
  }
}

export {
  getAllTheaterScreen
}