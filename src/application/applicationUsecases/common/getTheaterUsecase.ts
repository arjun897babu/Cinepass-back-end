import e from "express";
import { ResponseStatus } from "../../../domain/entities/common";
import { CustomError } from "../../../utils/CustomError";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

const getTheaterUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getTheaterDetails, getTheaterByCity } } = dependencies
  return {
    execute: async (_id: string, city?: string) => {
      try {

        let theaters
        if (city) {
          theaters = await getTheaterByCity(city)
        } else {
          theaters = await getTheaterDetails(_id);
        }
        
        return {
          status: ResponseStatus.SUCCESS,
          message: 'data fetched successfully',
          data: { theater: theaters }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  getTheaterUsecase
}