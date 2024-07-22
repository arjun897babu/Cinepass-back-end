import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
import { TheaterOwner } from "../../model/theaters"

const findTheaterOwnerById = async (_id: string): Promise<ITheaterOwnerEntity | null> => {
  try {
    const existingTheaterOwner = await TheaterOwner.findOne({ _id }).lean()
    if (!existingTheaterOwner) { return null }
    return existingTheaterOwner
  } catch (error) {
    throw error
  }
}

export {
  findTheaterOwnerById
}