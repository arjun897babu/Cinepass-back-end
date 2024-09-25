import { ITheaterScreen } from "../../../../domain/entities/theaters";
import { CustomError } from "../../../../utils/CustomError";
import { HttpStatusCode } from "../../../../utils/enum";
import { TheaterScreen } from "../../model/theaters";

const createTheaterScreen = async (_id: string, payload: ITheaterScreen): Promise<ITheaterScreen> => {

  try {
    console.log(_id)
    const isExists = await TheaterScreen.exists({
      $and: [
        { theaterId: _id },
        { screen_name: new RegExp(`^${payload.screen_name}$`, 'i') }
      ]
    });
    console.log(isExists)
    if (isExists) {
      throw new CustomError('Screen already exists', HttpStatusCode.CONFLICT, 'screen_name')
    }

    const newScreen = new TheaterScreen({ theaterId: _id, layout: payload.layout, chargePerSeat: payload.chargePerSeat, column: payload.column, rows: payload.rows, amenity: payload.amenity, screen_name: payload.screen_name, seating_capacity: payload.seating_capacity });
    await newScreen.save();
    return newScreen
  } catch (error) {

    throw error
  }
}
export {
  createTheaterScreen
}