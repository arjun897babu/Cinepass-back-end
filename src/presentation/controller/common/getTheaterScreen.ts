import { NextFunction, Request, Response } from "express"
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies"

const getTheaterScreen = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getTheaterScreenUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { } = req.params
      const response = await getTheaterScreenUsecase(dependencies).execute();
      res.status(200).json({
        message: response.message,
        status: response.status,
        data: response.data,
        redirectURL:response.redirectURL
      })
    } catch (error) {
      next(error)
    }
  }
}
export {
  getTheaterScreen
}