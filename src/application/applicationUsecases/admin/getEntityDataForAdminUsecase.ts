import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";
import {
  Role,
  ResponseStatus
} from "../../../utils/enum";

const getEntityDataForAdminUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { getEntityData } } = dependencies
  return {
    execute: async (role: (Role.users | Role.theaters), pageNumber: number) => {
      const data = await getEntityData(role, pageNumber);

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