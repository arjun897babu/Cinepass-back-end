import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { HTTPActions, HttpStatusCode, Role } from "../../../utils/enum";
import { CustomError } from "../../../utils/CustomError";
import { convertBoolean, getPageNumber } from "../../../utils/FilterAndPagination";
import { mongodbIdValidator } from "../../../utils/validator";

const addStreamPlan = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { streamPlanUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const data = req.body


      const response = await streamPlanUsecase(dependencies).execute({ action: HTTPActions.add, data })

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

const editStreamPlan = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { streamPlanUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roles, _id, planId } = req.params
      const data = req.body

      const response = await streamPlanUsecase(dependencies).execute({ action: HTTPActions.edit, data, planId })

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

const deleteStreamPlan = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { planId } = req.params
      mongodbIdValidator(planId)

      return res.status(HttpStatusCode.OK).json({
        status: 'success',
        message: 'streaming plan deleted successfully',
        data: null
      })
    } catch (error) {
      next(error)
    }
  }
}

const getStreamPlan = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { streamPlanUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { roles } = req.params

      const pageNumber = getPageNumber(req.query.pageNumber)
      const all = convertBoolean(req.query.all)

      if (roles !== Role.admin) {
        throw new CustomError('No access to the resources', HttpStatusCode.FORBIDDEN, 'Forbidden')
      }

      const response = await streamPlanUsecase(dependencies).execute({ action: HTTPActions.get, filter: { pageNumber, all } })

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
  getStreamPlan,
  addStreamPlan,
  editStreamPlan,
  deleteStreamPlan,
}