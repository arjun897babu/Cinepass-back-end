import { Router } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { adminController } from "../../../presentation/controller/admin";
import { verifyAdmin } from "../middleware/adminMiddleware";

const adminRoutes = (dependency: IAdminDependencies) => {

  const adminRouter = Router();
  const { login, logout, getEntityData, updateTheaterOwnerApproval, manageEntity } = adminController(dependency)
  adminRouter.route('/login').post(login)
  adminRouter.route('/logout').post(logout)
  adminRouter.use(verifyAdmin)
  adminRouter.route('/:role').get(getEntityData)
  adminRouter.route('/approval/:theaterOwnerId').put(updateTheaterOwnerApproval)
  adminRouter.route('/manage-status/:role/:_id').put(manageEntity);
  return adminRouter
};

export {
  adminRoutes
}