import { IUpdateApproval } from "../../../domain/domainUsecases";
import { IAdminLogin } from "../../../domain/domainUsecases/admin/IAdminLogin";
import { IGetTheaterOwnersForAdmin } from "../../../domain/domainUsecases/admin/IGetTheaterOwnersForAdmin";
import { IUpdateTheaterApproval } from "../../../domain/domainUsecases/admin/IUpdateTheaterApproval";

interface IAdminUsecase {
  adminLoginUseCase: (dependency: any) => IAdminLogin,
  getTheaterOwnersForAdminUsecase: (dependencies: any) => IGetTheaterOwnersForAdmin
  updateTheaterApprovalByAdminUseCase: (dependencies: any) => IUpdateTheaterApproval

}

export {
  IAdminUsecase
}