import { ILogin } from "../../../domain/domainUsecases";
import { AdminEntity } from "../../../domain/entities/admin/IAdmin";

interface IAdminRepositories {
  findAdmin: (email: string) => Promise<AdminEntity | null>
}

export {
  IAdminRepositories
}