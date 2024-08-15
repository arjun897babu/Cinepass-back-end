import { Router } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { adminController } from "../../../presentation/controller/admin";
import { verifyAdmin } from "../middleware/adminMiddleware";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { commonController } from "../../../presentation/controller/common";

const adminRoutes = (dependency: IAdminDependencies, commonDependencies: ICommonDependencies) => {

  const adminRouter = Router();
  const { login, logout, getEntityData, updateTheaterOwnerApproval, manageEntity, updateTheaterCity, addMovie, deleteMovie } = adminController(dependency)
  const { getMovies } = commonController(commonDependencies)
  adminRouter.route('/login').post(login)
  adminRouter.route('/logout').post(logout)

  adminRouter.route('/:role').get(verifyAdmin, getEntityData)
  adminRouter.route('/approval/:theaterOwnerId').put(verifyAdmin, updateTheaterOwnerApproval)
  adminRouter.route('/manage-status/:role/:entityId').put(verifyAdmin, manageEntity);
  adminRouter.route('/update-city/:_id').patch(verifyAdmin, updateTheaterCity);
  adminRouter.route('/add-movie/:movieType').post(verifyAdmin, addMovie);
  adminRouter.route('/delete/:movieType/:movieId').patch(verifyAdmin, deleteMovie);


  adminRouter.route('/get-movie/:movieType').get(verifyAdmin, getMovies);

  return adminRouter
};

export {
  adminRoutes
}