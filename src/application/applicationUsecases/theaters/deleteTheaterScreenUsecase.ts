import { ResponseStatus } from "../../../domain/entities/common";
import { CustomError } from "../../../utils/CustomError";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const deleteTheaterScreenUsecase = (dependencies:ITheaterDependencies)=>{
  const {theaterRepositories:{deleteTheaterScreen}} = dependencies

  return{
    execute:async (screenId:string)=>{
      try {
        const isDeleted = await deleteTheaterScreen(screenId)

        if(!isDeleted){
          throw new CustomError('screen not found',404,'screen')
        }

        return{
          status:ResponseStatus.SUCCESS,
          message:'Screen deleted successfully',
          data:{_id:screenId}
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  deleteTheaterScreenUsecase
}