import { ResponseStatus } from "../../../domain/entities/common";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const getAllTheaterScreenUseCase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { getAllTheaterScreen } } = dependencies

  return {
    execute: async (_id: string) => {
      try {

        const screens = await getAllTheaterScreen(_id)

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