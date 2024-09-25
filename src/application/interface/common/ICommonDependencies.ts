import { ICommonRepositories } from "./ICommonRespositories";
import { IRepositories } from "../user/IRepositories";
import { ITheaterRepositories } from "../theaters/ITheaterRepositories";
import { IAdminRepositories } from "../admin/IAdminRepositories";
import { ICommonUsecase } from "./ICommonUsecase";

interface ICommonDependencies {
  commonRepositories: ICommonRepositories
  commonUsecases: ICommonUsecase,
  userRepositories: IRepositories,
  adminRepositories: IAdminRepositories,
  theaterRepositories: ITheaterRepositories,
}

export {
  ICommonDependencies
}