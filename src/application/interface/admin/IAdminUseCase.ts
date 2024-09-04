import { IAdminAddMovie } from "../../../domain/domainUsecases/admin/IAdminAddMovie";
import { IAdminLogin } from "../../../domain/domainUsecases/admin/IAdminLogin";
import { IGetEntityDataForAdmin } from "../../../domain/domainUsecases/admin/IGetEntityDataForAdmin";
import { IManageMovieList } from "../../../domain/domainUsecases/admin/IManageMovieList";
import { IManageEntityStatus } from "../../../domain/domainUsecases/admin/IMangeEntity";
import { IUpdateMovie } from "../../../domain/domainUsecases/admin/IUpdateMovie";
import { IUpdateTheaterApproval } from "../../../domain/domainUsecases/admin/IUpdateTheaterApproval";
import { IUpdateTheaterCity } from "../../../domain/domainUsecases/admin/IUpdateTheaterCity";
 import { IAdminDependencies } from "./IAdminDependencies";

interface IAdminUsecase {
  adminLoginUseCase: (dependency: IAdminDependencies) => IAdminLogin;
  getEntityDataForAdminUsecase: (dependencies: IAdminDependencies) => IGetEntityDataForAdmin
  updateTheaterApprovalByAdminUseCase: (dependencies: IAdminDependencies) => IUpdateTheaterApproval
  manageEntityUsecase: (dependencies: IAdminDependencies) => IManageEntityStatus
  updateTheaterCityUsecase: (dependencies: IAdminDependencies) => IUpdateTheaterCity
  addMovieUsecase: (dependencies: IAdminDependencies) => IAdminAddMovie
  updateMovieUsecase: (dependencies: IAdminDependencies) => IUpdateMovie
  manangeMovieUsecase: (dependencies: IAdminDependencies) => IManageMovieList
}

export {
  IAdminUsecase
}