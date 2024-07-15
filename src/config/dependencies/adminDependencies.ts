import { IAdminDependencies } from "../../application/interface/admin/IAdminDependencies"
import * as adminRepositories from '../../infrastructure/database/repositories/admin'
import * as adminUsecase from '../../application/applicationUsecases/admin'
const adminDependencies: IAdminDependencies = {
  adminRepositories,
  adminUsecase
}

export {
  adminDependencies
}