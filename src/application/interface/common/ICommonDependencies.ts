import { ICommonRepositories } from "./ICommonRespositories";
import { ICommonUsecase } from "./ICommonUsecase";

interface ICommonDependencies{
  commonRepositories:ICommonRepositories
  commonUsecases:ICommonUsecase
}

export {
  ICommonDependencies
}