import { Router } from "express"
import { adminLogin } from "./adminLoginController"
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"
import { adminLogout } from "./adminLogoutController"
import { getTheaterOwner } from "./getTheaterOwnerController"
import { updateTheaterApprovalByAdmin } from "./updateTheaterApprovalController"

const adminController  = (dependencies:IAdminDependencies)=>{
  return {
    login:adminLogin(dependencies),
    logout:adminLogout(),
    getTheaterOwner:getTheaterOwner(dependencies),
    updateTheaterOwnerApproval:updateTheaterApprovalByAdmin(dependencies)
  }
}

export {
  adminController
}