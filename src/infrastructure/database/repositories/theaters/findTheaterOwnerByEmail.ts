import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { TheaterOwner } from "../../model/theaters";

const findTheaterOwnerByEmail = async (email: string): Promise<ITheaterOwnerEntity | null> => {
  try {

    const existingTheaterOwner = await TheaterOwner.findOne({ email }).lean();

    return existingTheaterOwner

  } catch (error) {
    throw error
  }
}

export {
  findTheaterOwnerByEmail
}