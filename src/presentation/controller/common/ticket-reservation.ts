import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { HttpStatusCode } from "../../../utils/enum";

const ticketReservation = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, showId, roles } = req.params
      const payload = req.body;

      return res.status(HttpStatusCode.OK).json({
        status: '',
        message: '',
        data: ''
      })

    } catch (error) {
      next(error)
    }


  }
}
export {
  ticketReservation
}