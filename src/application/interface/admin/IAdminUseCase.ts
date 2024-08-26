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
  adminLoginUseCase: (dependency: any) => IAdminLogin;
  getEntityDataForAdminUsecase: (dependencies: any) => IGetEntityDataForAdmin
  updateTheaterApprovalByAdminUseCase: (dependencies: any) => IUpdateTheaterApproval
  manageEntityUsecase: (dependencies: any) => IManageEntityStatus
  updateTheaterCityUsecase: (dependencies: any) => IUpdateTheaterCity
  addMovieUsecase: (dependencies: any) => IAdminAddMovie
  updateMovieUsecase: (dependencies: IAdminDependencies) => IUpdateMovie
  manangeMovieUsecase: (dependencies: any) => IManageMovieList
}

export {
  IAdminUsecase
}