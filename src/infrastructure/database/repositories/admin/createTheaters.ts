import { ITheaters } from "../../../../domain/entities/theaters"
import { Theaters } from "../../model/theaters"

const createTheater = async(data:ITheaters):Promise<boolean>=>{
  try {
    const newTheater = await Theaters.create(data)

    return !!newTheater
  } catch (error) {
    throw error
  }
}

export {
  createTheater
} 