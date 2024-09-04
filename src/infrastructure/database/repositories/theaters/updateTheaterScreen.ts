import { ITheaterScreen } from "../../../../domain/entities/theaters";
import { CustomError } from "../../../../utils/CustomError";
import { TheaterScreen } from "../../model/theaters";

const updateTheaterScreen = async (screenId: string, payload: ITheaterScreen): Promise<ITheaterScreen | null> => {
  try {

    const existingScreen = await TheaterScreen.exists({ screen_name: { $regex: new RegExp(`^${payload.screen_name}$`, 'i') }, _id: { $ne: screenId } });

    if (existingScreen) {
      throw new CustomError('Screen already exists', 409, 'screen_name')
    }
    const updatedScreen = await TheaterScreen.findOneAndUpdate({ _id: screenId }, { ...payload }, { new: true }).lean()
    return updatedScreen
  } catch (error) {
    throw error
  }
}

export {
  updateTheaterScreen
}