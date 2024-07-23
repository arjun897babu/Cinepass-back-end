import { NextFunction, Request, Response } from "express"
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"
import { Role } from "../../../utils/enum"
import { CustomError } from "../../../utils/CustomError"

const getEntityData = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { getEntityDataForAdminUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { role } = req.params
       
      if (role !== Role.users && role !== Role.theaters) {
        throw new CustomError('InValid Request', 400, 'role')
      }

      const response = await getEntityDataForAdminUsecase(dependencies).execute(role);

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