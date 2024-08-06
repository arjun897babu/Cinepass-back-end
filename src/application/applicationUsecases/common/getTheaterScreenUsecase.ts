import { ResponseStatus } from "../../../domain/entities/common"
import { CustomError } from "../../../utils/CustomError"
import { ICommonDependencies } from "../../interface/common/ICommonDependencies"

const getTheaterScreenUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getTheaterScreen } } = dependencies

  return {
    execute: async ( ) => {
      try {
        const screen = await getTheaterScreen( )
 
        return {
          status: ResponseStatus.SUCCESS,
          message: 'data fetched successfully',
          data: { screen }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  getTheaterScreenUsecase
}