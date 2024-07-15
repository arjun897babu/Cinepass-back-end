import { ITheaterOwnerEntity} from "../../../../domain/entities/theaters"
import { TheaterOwner } from "../../model/theaters"



const createTheaterOwner = async (data: ITheaterOwnerEntity): Promise<ITheaterOwnerEntity | null> => {
  try {
    const newTheaterOwner = await TheaterOwner.create(data);
    return newTheaterOwner
  } catch (error) {
    throw error
  }
}
 

export {
  createTheaterOwner
}