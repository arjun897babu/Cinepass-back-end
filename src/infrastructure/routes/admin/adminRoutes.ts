import { Router } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { adminController } from "../../../presentation/controller/admin";
import { verifyAdmin } from "../middleware/adminMiddleware";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { commonController } from "../../../presentation/controller/common";

const adminRoutes = (dependency: IAdminDependencies, commonDependencies: ICommonDependencies) => {

  const adminRouter = Router();
  const {
    login,
    logout,
    getEntityData,
    updateTheaterOwnerApproval,
    manageEntity,
    updateTheaterCity,
    addMovie,
    deleteMovie
  } = adminController(dependency)
  
  const { getMovies } = commonController(commonDependencies)

  /*......................................... AUTH........................................... */
  adminRouter.route('/login').post(login)
  adminRouter.route('/logout').post(logout)
  /*......................................... AUTH........................................... */



  /*......................................... Entity Manage........................................... */

  adminRouter.route('/:role').get(verifyAdmin, getEntityData)
  adminRouter.route('/approval/:theaterOwnerId').patch(verifyAdmin, updateTheaterOwnerApproval)
  adminRouter.route('/:role/:entityId').patch(verifyAdmin, manageEntity);
  // adminRouter.route('/update-city/:_id').patch(verifyAdmin, updateTheaterCity);

  /*......................................... Entity Manage........................................... */



  /*......................................... Movies........................................... */

  adminRouter
    .route('/movie/:movieType')
    .get(verifyAdmin, getMovies)// for getting avaiable movies 
    .post(verifyAdmin, addMovie)//adding movies into theater and stream
  adminRouter
    .route('/movie/:movieType/:movieId')
    .patch(verifyAdmin, deleteMovie)//unlisting movie 
    .put(verifyAdmin)//updating  a existing movies

  /*......................................... Movies........................................... */

  return adminRouter
};

export {
  adminRoutes
}