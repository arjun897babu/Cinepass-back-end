import { ResponseStatus } from "../../../domain/entities/common";
import { IDependencies } from "../../interface/user/IDependencies";

const getAllCitiesUsecase = (dependencies: IDependencies) => {
  const { repositories: { getCities } } = dependencies

  return {
    execute: async () => {
      try {
        const cities = await getCities()

        return {
          status: ResponseStatus.SUCCESS,
          message: 'City list fetched successfully',
          data: { cities }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  getAllCitiesUsecase
}