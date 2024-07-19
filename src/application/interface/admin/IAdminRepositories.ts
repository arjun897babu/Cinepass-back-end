import { IUpdateApproval } from "../../../domain/domainUsecases";
import { AdminEntity } from "../../../domain/entities/admin/IAdmin";
import { ITheaterOwnerEntity } from "../../../domain/entities/theaters";

interface IAdminRepositories {
  findAdmin: (email: string) => Promise<AdminEntity | null>
  getTheaterOwnersForAdmin: () => Promise<ITheaterOwnerEntity[] | []>
  updateTheaterApprovalByAdmin: (payload: IUpdateApproval) => Promise<IUpdateApproval | null>

}

export {
  IAdminRepositories
}