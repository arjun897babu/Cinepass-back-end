import { ITheaterScreen } from "../../../../domain/entities/theaters";
import { CustomError } from "../../../../utils/CustomError";
import { TheaterScreen } from "../../model/theaters";

const createTheaterScreen = async (_id: string, payload: ITheaterScreen): Promise<ITheaterScreen> => {

  try {
    const isExists = await TheaterScreen.exists({
      screen_name: {
        $regex: payload.screen_name
          .split('')
          .join('\\s*'),
        $options: 'i'
      }
    })

    if(isExists){
      throw new CustomError('Screen already exists', 409, 'screen_name')
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