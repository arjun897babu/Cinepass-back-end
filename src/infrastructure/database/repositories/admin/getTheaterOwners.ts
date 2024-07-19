import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { TheaterOwner } from "../../model/theaters";

const getTheaterOwnersForAdmin = async (): Promise<ITheaterOwnerEntity[]|[]> => {
  try {
    const TheaterOwnerList = await TheaterOwner.find({}).lean();
    return TheaterOwnerList
  } catch (error) {
    throw error
  }
}

export {
  getTheaterOwnersForAdmin
}