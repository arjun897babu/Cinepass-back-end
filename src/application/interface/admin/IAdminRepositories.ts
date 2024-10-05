import { IManageEntity, IUpdateApproval } from "../../../domain/domainUsecases";
import { AdminEntity } from "../../../domain/entities/admin/IAdmin";
import { ITheaterOwnerEntity, } from "../../../domain/entities/theaters";
import { MovieType, Role } from "../../../utils/enum";
import { ICityUpdate, IManageMovie, IRental, IStreamPlanFilter } from "../../../utils/interface";
import { IMovie } from "../../../domain/entities/admin/ITheaterMovie";
import { EntityResponse } from "../../../domain/domainUsecases/admin/IGetEntityDataForAdmin";
import { IStreamRentalPlan } from "../../../domain/entities/admin/IStreamRentalPlan";
import { IGetStreamPlanResponse } from "../../../domain/domainUsecases/admin";

interface IAdminRepositories {
  findAdmin: (email: string) => Promise<AdminEntity | null>
  getEntityData: (role: (Role.users | Role.theaters), pageNumber: number) => Promise<EntityResponse>
  updateTheaterApprovalByAdmin: (payload: IUpdateApproval) => Promise<ITheaterOwnerEntity | null>
  updateBlockStatus: (payload: IManageEntity) => Promise<IManageEntity | null>
  updateTheaterCity: (data: ICityUpdate) => Promise<ICityUpdate | null>
  addMovie: (payload: IMovie, movieType: MovieType) => Promise<IMovie>
  deleteMovie: (payload: IManageMovie) => Promise<IManageMovie | null>
  updateMovie: (movieId: string, payload: IMovie, movieType: MovieType) => Promise<IMovie | null>
  addStreamPlan: (data: Omit<IRental, 'listed'>) => Promise<IStreamRentalPlan>
  editStreamPlan: (planId: string, data: Omit<IRental, 'listed'>) => Promise<IStreamRentalPlan | null>
  getStreamPlan: (filter: Partial<IStreamPlanFilter>) => Promise<IGetStreamPlanResponse | null>
  isPlanExists: (planName: string) => Promise<boolean>
  deleteStreamPlan: (planId: string) => Promise<IStreamRentalPlan | null>
}

export {
  IAdminRepositories
}