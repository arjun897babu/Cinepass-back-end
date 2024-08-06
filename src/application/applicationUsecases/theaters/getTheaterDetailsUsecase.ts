import { ResponseStatus } from "../../../domain/entities/common";
import { CustomError } from "../../../utils/CustomError";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const getTheaterDetailsUseCase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { getTheaterDetails } } = dependencies;
  return {
    execute: async (ownerId: string) => {
      try {
        const response = await getTheaterDetails(ownerId);
        if (!response) {
          throw new CustomError('No data Found', 404, 'theater')
        }
        return {

          status: ResponseStatus.SUCCESS,
          message: 'Data fetched successfully',
          data: { theater: response },
          redirectURL: '#'
        }
      } catch (error) {
        throw error
      }
    }
  }

}

export {
  getTheaterDetailsUseCase
}