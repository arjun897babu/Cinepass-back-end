import { Router } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { adminController } from "../../../presentation/controller/admin";

const adminRoutes = (dependency: IAdminDependencies) => {

  const adminRouter = Router();
  const { login } = adminController(dependency)
  adminRouter.route('/login').post(login)
  return adminRouter
};

export {
  adminRoutes
}