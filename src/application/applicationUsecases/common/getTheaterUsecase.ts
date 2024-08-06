import { ResponseStatus } from "../../../domain/entities/common";
import { CustomError } from "../../../utils/CustomError";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

const getTheaterUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getTheaterDetails } } = dependencies
  return {
    execute: async (_id: string) => {
      try {
        const theaters = await getTheaterDetails(_id);
        if(!theaters){
          throw new CustomError('not found',404,'theater')
        }
        return {
          status: ResponseStatus.SUCCESS,
          message: 'data fetched successfully',
          data: { theaters: theaters }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  getTheaterUsecase
}