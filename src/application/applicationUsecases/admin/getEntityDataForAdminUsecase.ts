import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../domain/entities/common";
import { Role } from "../../../utils/enum";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const getEntityDataForAdminUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { getEntityData } } = dependencies
  return {
    execute: async (role: Role.users | Role.theaters): Promise<IResponse> => {

      const data = await getEntityData(role);

      return {
        status: ResponseStatus.SUCCESS,
        message: 'Data fetched successfully',
        data: { [role]: data }
      }
    }
  }
}

export {
  getEntityDataForAdminUsecase
}