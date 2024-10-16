import { adminLogin } from "./adminLoginController"
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"
import { adminLogout } from "./adminLogoutController"
import { getEntityData } from "./getEntityData"
import { updateTheaterApprovalByAdmin } from "./updateTheaterApprovalController"
import { manageEntity } from "./manageUserController"
import { updateTheaterCity } from "./updateTheaterCityController"
import { addMovie } from "./addMovieController"
import { deleteMovie } from "./deleteMovie"
import { updateMovie } from "./updateMovieController"
import { addStreamPlan, deleteStreamPlan, editStreamPlan, getStreamPlan } from "./stream-plan-controller"
import { getCountStatics, getMovieStatics } from "./dashboard-admin"
import { getStreamingUrl } from "./get-streaming-url"

const adminController = (dependencies: IAdminDependencies) => {
  return {
    login: adminLogin(dependencies),
    logout: adminLogout(),
    getEntityData: getEntityData(dependencies),
    updateTheaterOwnerApproval: updateTheaterApprovalByAdmin(dependencies),
    manageEntity: manageEntity(dependencies),
    updateTheaterCity: updateTheaterCity(dependencies),
    addMovie: addMovie(dependencies),
    deleteMovie: deleteMovie(dependencies),
    updateMovie: updateMovie(dependencies),
    addStreamingPlan: addStreamPlan(dependencies),
    editStreamingPlan: editStreamPlan(dependencies),
    deleteStreamingPlan: deleteStreamPlan(dependencies),
    getStreamingPlan: getStreamPlan(dependencies),
    getCountStatics: getCountStatics(dependencies),
    getStreamStat: getMovieStatics(dependencies),
    getStreamingUrl:getStreamingUrl(dependencies)
  }
}

export {
  adminController
}