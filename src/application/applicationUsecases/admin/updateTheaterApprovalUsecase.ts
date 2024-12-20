import { CustomError } from "../../../utils/CustomError";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";
import {
  IResponse,
  IUpdateApproval
} from "../../../domain/domainUsecases";
import {
  ApprovalStatus,
  ResponseStatus
} from "../../../utils/enum";

const updateTheaterApprovalByAdminUseCase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { updateTheaterApprovalByAdmin } } = dependencies
  return {
    execute: async (payload: IUpdateApproval): Promise<IResponse> => {
      try {

        const updatedTheater = await updateTheaterApprovalByAdmin(payload);

        //For handling the case where no theater found
        if (!updatedTheater) {
          throw new CustomError('Theater details not found', 404, 'Not found')
        }

        let responseMessage: string;
        switch (updatedTheater.approval_status) {
          case ApprovalStatus.PENDING:
            responseMessage = 'Account permission pending';
            break;
          case ApprovalStatus.REJECTED:
            responseMessage = 'Account permission rejected';
            break;
          case ApprovalStatus.APPROVED:
            responseMessage = 'Account permission approved';
            break;
          default:
            responseMessage = 'Account permission pending'
        };
        return {
          status: ResponseStatus.SUCCESS,
          message: responseMessage,
          data: {
            theater: {
              _id: updatedTheater._id,
              approval_status: updatedTheater.approval_status
            }
          }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  updateTheaterApprovalByAdminUseCase
}