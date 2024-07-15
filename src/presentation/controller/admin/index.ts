import { Router } from "express"
import { adminLogin } from "./adminLoginController"
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"

const adminController  = (dependencies:IAdminDependencies)=>{
  return {
    login:adminLogin(dependencies)
  }
}

export {
  adminController
}