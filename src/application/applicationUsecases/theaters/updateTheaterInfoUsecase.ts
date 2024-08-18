import { ResponseStatus } from "../../../domain/entities/common";
import { CustomError } from "../../../utils/CustomError";
import { TheaterOwnerProfile, TheaterProfile } from "../../../utils/interface";
import { isTheaterOwnerProfile } from "../../../utils/typeGaurd";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"

const updateTheaterInfoUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { updateTheater, updateTheaterOwner } } = dependencies;
  return {
    execute: async (_id: string, payload: (TheaterOwnerProfile | TheaterProfile)) => {
      console.log(payload)
      try {

        let updated;

        if (isTheaterOwnerProfile(payload)) {
          updated = await updateTheaterOwner(_id, payload);
        } else {
          updated = await updateTheater(_id, payload);
        }

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