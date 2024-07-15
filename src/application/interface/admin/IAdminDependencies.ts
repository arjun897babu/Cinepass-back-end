import { IAdminRepositories } from "./IAdminRepositories"
import { IAdminUsecase } from "./IAdminUseCase"

interface IAdminDependencies {
  adminRepositories: IAdminRepositories
  adminUsecase: IAdminUsecase
}

export {
  IAdminDependencies
}