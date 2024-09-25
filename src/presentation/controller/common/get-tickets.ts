import { NextFunction, Request, Response } from "express"
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies"
import { validateRole } from "../../../utils/validator"
import { HttpStatusCode, Role } from "../../../utils/enum"
import { getPageNumber } from "../../../utils/FilterAndPagination"

const getTickets = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getTicketDataUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roles, _id } = req.params
      console.log('in get ticket controller', req.params)
      const pageNumber = getPageNumber(req.query)
      validateRole(roles)
      const response = await getTicketDataUsecase(dependencies).execute(roles as Role, _id,pageNumber)
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
  getTickets
}

