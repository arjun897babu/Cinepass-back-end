import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../domain/entities/common";
import { TheaterOwner } from "../../../infrastructure/database/model/theaters";
import { CustomError } from "../../../utils/CustomError";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const getTheaterOwnersForAdminUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { getTheaterOwnersForAdmin } } = dependencies
  return {
    execute: async (): Promise<IResponse> => {

      const theaterOwner = await getTheaterOwnersForAdmin();

      return {
        status: ResponseStatus.SUCCESS,
        message: 'Data fetched successfully',
        data: {theaterOwners: theaterOwner }
      }
    }
  }
}

export {
  getTheaterOwnersForAdminUsecase
}