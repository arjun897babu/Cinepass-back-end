import { ITheaterScreen } from "../../../../domain/entities/theaters";
import { TheaterScreen } from "../../model/theaters";

const createTheaterScreen = async (_id: string, payload: ITheaterScreen): Promise<ITheaterScreen> => {

  try {
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