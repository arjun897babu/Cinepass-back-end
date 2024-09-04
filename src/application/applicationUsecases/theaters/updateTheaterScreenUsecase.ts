import { ResponseStatus } from "../../../domain/entities/common";
import { ITheaterScreen } from "../../../domain/entities/theaters";
import { CustomError } from "../../../utils/CustomError";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const updateTheaterScreenUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { updateTheaterScreen } } = dependencies;

  return {
    execute: async (screenId: string, payload: ITheaterScreen) => {
      try {
        const screen = await updateTheaterScreen(screenId, payload);
        if (!screen) {
          throw new CustomError('screen not found', 404, 'screen');
        }

        return {
          status: ResponseStatus.SUCCESS,
          message: 'screen updated successfully',
          data: { screen }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  updateTheaterScreenUsecase
}