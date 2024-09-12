 import { ResponseStatus } from "../../../utils/enum";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const getAllTheaterScreenUseCase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { getAllTheaterScreen } } = dependencies

  return {
    execute: async (_id: string, amenity?: string) => {
      try {

        const screens = await getAllTheaterScreen(_id,amenity)

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Screen data fetched successfully',
          data: { screens },
        }
      } catch (error) {
        throw error
      }
    }
  }
}
export {
  getAllTheaterScreenUseCase
}