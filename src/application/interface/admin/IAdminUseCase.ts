import {
  IAdminAddMovie,
  IAdminLogin,
  IGetEntityDataForAdmin,
  IManageEntityStatus,
  IManageMovieList,
  IStreamPlan,
  IUpdateMovie,
  IUpdateTheaterApproval,
  IUpdateTheaterCity
} from "../../../domain/domainUsecases/admin";
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
  streamPlanUsecase: (dependencies: IAdminDependencies) => IStreamPlan
}

export {
  IAdminUsecase
}