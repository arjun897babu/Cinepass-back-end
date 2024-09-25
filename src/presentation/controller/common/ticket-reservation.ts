import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { HttpStatusCode, Role } from "../../../utils/enum";
import { mongodbIdValidator } from "../../../utils/validator";
import { toValidJSDate } from "../../../utils/FilterAndPagination";

const ticketReservation = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { ticketReservation } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, showId, roles } = req.params

      mongodbIdValidator(showId)
      const { reservedSeats, bookingDate } = req.body
      const response = await ticketReservation(dependencies).execute(
        roles as Role,
        _id,
        showId,
        {
          bookingDate: new Date(bookingDate),
          reservedSeats
        }
      )
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
  ticketReservation
}