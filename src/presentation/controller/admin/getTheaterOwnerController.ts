import { NextFunction, Request, Response } from "express"
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies"
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"

const getTheaterOwner = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { getTheaterOwnersForAdminUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const response = await getTheaterOwnersForAdminUsecase(dependencies).execute();
       
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
  getTheaterOwner
}