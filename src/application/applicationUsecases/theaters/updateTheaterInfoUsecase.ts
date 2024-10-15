import { ITheaterOwnerEntity } from "../../../domain/entities/theaters";
import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"

const updateTheaterInfoUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { updateTheater } } = dependencies;
  return {
    execute: async (_id: string, payload: Partial<ITheaterOwnerEntity>) => {
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