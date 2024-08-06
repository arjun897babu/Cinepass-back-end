import { ITheaterScreen } from "../../../../domain/entities/theaters"
import { TheaterScreen } from "../../model/theaters"

const getAllTheaterScreen = async (_id: string): Promise<ITheaterScreen[] | []> => {
  try {
    const allScreen = await TheaterScreen.aggregate([
      {
        $match: {}
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