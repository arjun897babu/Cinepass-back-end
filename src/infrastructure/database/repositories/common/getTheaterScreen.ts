import { Types } from "mongoose"
import { TheaterScreen } from "../../model/theaters"
import { ITheaterScreen } from "../../../../domain/entities/theaters";

const getTheaterScreen = async (): Promise<ITheaterScreen[] | []> => {
  try {
    const screen = await TheaterScreen.aggregate(
      [
        {
          $match: {}
        }
      ]
    );

    return screen

  } catch (error) {
    throw error
  }
}

export {
  getTheaterScreen
}