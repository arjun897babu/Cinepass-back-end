 import { ITheaterScreen } from "../../../domain/entities/theaters";
import { ResponseStatus } from "../../../utils/enum";
 import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const createTheaterScreenUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { createTheaterScreen } } = dependencies;

  return {
    execute: async (_id: string, payload: ITheaterScreen) => {
      try {

        const response = await createTheaterScreen(_id, payload);
       
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Screen added successfully',
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