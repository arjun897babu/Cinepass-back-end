import { ResponseStatus } from "../../../domain/entities/common";
import { CustomError } from "../../../utils/CustomError";
import { ITheaterUpdateInfoPayload } from "../../../utils/interface";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"

const updateTheaterInfoUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { updateTheater } } = dependencies;
  return {
    execute: async (_id: string, payload: ITheaterUpdateInfoPayload) => {
      try {
        const updated = await updateTheater(_id, payload);
        if (!updated) {
          throw new CustomError('Not found', 404, 'theater')
        }
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Data updated successfully',
          data: { theater: updated },
          redirectURL: '#'
        }
      } catch (error) {
        throw error
      }
    }
  }
};

export {
  updateTheaterInfoUsecase
}