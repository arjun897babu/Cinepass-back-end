import { IAdminLogin } from "../../../domain/domainUsecases/admin/IAdminLogin";

interface IAdminUsecase {
  adminLoginUseCase: (dependency: any) => IAdminLogin
}

export {
  IAdminUsecase
}