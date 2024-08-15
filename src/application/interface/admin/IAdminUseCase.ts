import { IAdminAddMovie } from "../../../domain/domainUsecases/admin/IAdminAddMovie";
import { IAdminLogin } from "../../../domain/domainUsecases/admin/IAdminLogin";
import { IGetEntityDataForAdmin } from "../../../domain/domainUsecases/admin/IGetEntityDataForAdmin";
import { IManageMovieList } from "../../../domain/domainUsecases/admin/IManageMovieList";
import { IManageEntityStatus } from "../../../domain/domainUsecases/admin/IMangeEntity";
import { IUpdateTheaterApproval } from "../../../domain/domainUsecases/admin/IUpdateTheaterApproval";
import { IUpdateTheaterCity } from "../../../domain/domainUsecases/admin/IUpdateTheaterCity";

interface IAdminUsecase {
  adminLoginUseCase: (dependency: any) => IAdminLogin;
  getEntityDataForAdminUsecase: (dependencies: any) => IGetEntityDataForAdmin
  updateTheaterApprovalByAdminUseCase: (dependencies: any) => IUpdateTheaterApproval
  manageEntityUsecase: (dependencies: any) => IManageEntityStatus
  updateTheaterCityUsecase: (dependencies: any) => IUpdateTheaterCity
  addMovieUsecase: (dependencies: any) => IAdminAddMovie
  manangeMovieUsecase: (dependencies: any) => IManageMovieList
}

export {
  IAdminUsecase
}