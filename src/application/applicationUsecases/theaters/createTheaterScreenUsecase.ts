import { ResponseStatus } from "../../../domain/entities/common";
import { ITheaterScreen } from "../../../domain/entities/theaters";
import { CustomError } from "../../../utils/CustomError";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const createTheaterScreenUsecase = (dependecies: ITheaterDependencies) => {
  const { theaterRepositories: { createTheaterScreen } } = dependecies;

  return {
    execute: async (_id: string, payload: ITheaterScreen) => {
      try {

        const response = await createTheaterScreen(_id, payload);
       
        return {
          status: ResponseStatus.SUCCESS,
          message: '',
          data: { screen: response }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  createTheaterScreenUsecase
}