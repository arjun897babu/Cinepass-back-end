import { Router } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { adminController } from "../../../presentation/controller/admin";
import { verifyAdmin } from "../middleware/adminMiddleware";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { commonController } from "../../../presentation/controller/common";
import { upload } from "../middleware/multer";

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
    deleteMovie,
    getStreamingUrl,
    addStreamingPlan,
    editStreamingPlan,
    deleteStreamingPlan,
    updateMovie,
    getStreamingPlan,
    getCountStatics,
    getStreamStat
  } = adminController(dependency)

  const { getMovies } = commonController(commonDependencies)

  /*......................................... AUTH........................................... */
  adminRouter.route('/login').post(login)
  adminRouter.route('/logout').post(logout)
  /*......................................... AUTH........................................... */



  /*......................................... Entity Manage........................................... */

  adminRouter.route('/entity/:role').get(verifyAdmin, getEntityData)
  adminRouter.route('/approval/:theaterOwnerId').patch(verifyAdmin, updateTheaterOwnerApproval)
  adminRouter.route('/entity/:role/:entityId').patch(verifyAdmin, manageEntity);
  // adminRouter.route('/update-city/:_id').patch(verifyAdmin, updateTheaterCity);

  /*......................................... Entity Manage........................................... */



  /*......................................... Movies........................................... */

  adminRouter
    .route('/movie/:movieType')
    .get(verifyAdmin, getMovies)// for getting  movies [streaming movies/theater movies]
    .post(verifyAdmin, upload.single('file'), addMovie)//adding movies into theater and stream
  adminRouter
    .route('/movie/:movieType/:movieId')
    .patch(verifyAdmin, deleteMovie)//un listing movie 
    .put(verifyAdmin,upload.single('file'), updateMovie)//updating  a existing movies
    adminRouter
    .route('/stream/:publicId')
    .get(verifyAdmin,getStreamingUrl)

  /*......................................... Movies........................................... */


  /*......................................... streaming-plan........................................... */
  adminRouter
    .route('/stream-plan')
    .get(verifyAdmin, getStreamingPlan)
    .post(verifyAdmin, addStreamingPlan)
  adminRouter
    .route('/stream-plan/:planId')
    .put(verifyAdmin, editStreamingPlan)
    .patch(verifyAdmin, deleteStreamingPlan)
  /*......................................... streaming-plan........................................... */


  /*......................................... dashboard........................................... */
  
  adminRouter
    .route('/dashboard/statics')
    .get(verifyAdmin, getCountStatics)
  adminRouter
    .route('/dashboard/stream')
    .get(verifyAdmin, getStreamStat)

  /*......................................... dashboard........................................... */



  return adminRouter
};

export {
  adminRoutes
}