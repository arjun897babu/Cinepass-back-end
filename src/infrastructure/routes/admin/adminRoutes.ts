import { Router } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { adminController } from "../../../presentation/controller/admin";

const adminRoutes = (dependency: IAdminDependencies) => {

  const adminRouter = Router();
  const { login, logout, getTheaterOwner, updateTheaterOwnerApproval } = adminController(dependency)
  adminRouter.route('/login').post(login)
  adminRouter.route('/logout').post(logout)
  adminRouter.route('/theaters').get(getTheaterOwner)
  adminRouter.route('/approval/:theaterOwnerId').put(updateTheaterOwnerApproval)
  return adminRouter
};

export {
  adminRoutes
}