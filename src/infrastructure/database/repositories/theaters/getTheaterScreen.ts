import { Types } from "mongoose"
import { ITheaterScreen } from "../../../../domain/entities/theaters"
import { TheaterScreen } from "../../model/theaters"

const getAllTheaterScreen = async (_id: string): Promise<ITheaterScreen[] | []> => {
  try {
     
    const allScreen = await TheaterScreen.aggregate([
      {
        $match: { theaterId: new Types.ObjectId(_id) }
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