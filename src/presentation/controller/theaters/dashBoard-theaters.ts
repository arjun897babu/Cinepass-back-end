import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { HttpStatusCode } from "../../../utils/enum";
import { validatePeriod } from "../../../utils/FilterAndPagination";
import { mongodbIdValidator } from "../../../utils/validator";

const theaterCountStat = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { getCountStat } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, roles } = req.params
      const response = await getCountStat(dependencies).execute(_id)
      return res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        data: response.data
      })

    } catch (error) {
      next(error)
    }
  }
}

const getRevenueByScreen = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { getRevenueByScreen } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, roles } = req.params
      const screenId = req.query.screenId as string
      if (screenId !== undefined) {
        mongodbIdValidator(screenId)
      }
      const period = validatePeriod(req.query.period)
      const response = await getRevenueByScreen(dependencies).execute(_id, { period, screenId })
      console.log(response.data)
      return res.status(HttpStatusCode.OK).json({
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
  theaterCountStat,
  getRevenueByScreen
}