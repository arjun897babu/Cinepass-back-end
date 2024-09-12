 import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { ICityUpdate } from "../../../utils/interface";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const updateTheaterCityUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { updateTheaterCity } } = dependencies;

  return {
    execute: async (data: ICityUpdate) => {
      try {

        const updatedTheater = await updateTheaterCity(data);
        if (!updatedTheater) {
          throw new CustomError('Theater not found', 404, 'theater')
        }

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Data updated Successfully',
          data: { theater: updatedTheater }
        }

      } catch (error) {
        throw error
      }
    }
  }
};

export {
  updateTheaterCityUsecase
}