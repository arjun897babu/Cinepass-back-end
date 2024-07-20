import { adminLogin } from "./adminLoginController"
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"
import { adminLogout } from "./adminLogoutController"
import { getEntityData } from "./getEntityData"
import { updateTheaterApprovalByAdmin } from "./updateTheaterApprovalController"
import { manageEntity } from "./manageUserController"

const adminController = (dependencies: IAdminDependencies) => {
  return {
    login: adminLogin(dependencies),
    logout: adminLogout(),
    getEntityData: getEntityData(dependencies),
    updateTheaterOwnerApproval: updateTheaterApprovalByAdmin(dependencies),
    manageEntity: manageEntity(dependencies)
  }
}

export {
  adminController
}