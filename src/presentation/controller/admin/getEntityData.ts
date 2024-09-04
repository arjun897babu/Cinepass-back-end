import { NextFunction, Request, Response } from "express"
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"
import { Role } from "../../../utils/enum"
import { CustomError } from "../../../utils/CustomError"
import { getPageNumber } from "../../../utils/FilterAndPagination"

const getEntityData = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { getEntityDataForAdminUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { role } = req.params
      const pageNumber  =getPageNumber(req.query.pageNumber)

      if (role !== Role.users && role !== Role.theaters) { 
        throw new CustomError('InValid Request', 400, 'role')
      }

      const response = await getEntityDataForAdminUsecase(dependencies).execute(role,pageNumber);

      return res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data
      })
    } catch (error) {
      next(error)
    }

  }
}

export {
  getEntityData
}