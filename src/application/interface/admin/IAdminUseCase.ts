import { IUpdateApproval } from "../../../domain/domainUsecases";
import { IAdminLogin } from "../../../domain/domainUsecases/admin/IAdminLogin";
import { IGetEntityDataForAdmin } from "../../../domain/domainUsecases/admin/IGetEntityDataForAdmin";
import { IManageEntityStatus } from "../../../domain/domainUsecases/admin/IMangeEntity";
import { IUpdateTheaterApproval } from "../../../domain/domainUsecases/admin/IUpdateTheaterApproval";

interface IAdminUsecase {
  adminLoginUseCase: (dependency: any) => IAdminLogin,
  getEntityDataForAdminUsecase: (dependencies: any) => IGetEntityDataForAdmin
  updateTheaterApprovalByAdminUseCase: (dependencies: any) => IUpdateTheaterApproval
  manageEntityUsecase: (dependencies: any) => IManageEntityStatus

}

export {
  IAdminUsecase
}