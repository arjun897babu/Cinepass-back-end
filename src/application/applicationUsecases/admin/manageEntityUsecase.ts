import { IManageEntity, IResponse } from "../../../domain/domainUsecases";
 import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const manageEntityUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { updateBlockStatus } } = dependencies
  return {
    execute: async (payload: IManageEntity): Promise<IResponse> => {
      try {
        const updated = await updateBlockStatus(payload);
        if (!updated) {
          throw new CustomError('Data Not found', 404, payload.role)
        }
        return {
          message: 'updated Successfully',
          status: ResponseStatus.SUCCESS,
          data: {
            _id: updated.entityId,
          }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  manageEntityUsecase
}