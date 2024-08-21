import { NextFunction, Request, Response } from "express"
import { Cookie } from "../../../utils/jwtHandler"

const adminLogout = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      res.clearCookie(Cookie.adminJWT, {
        httpOnly: true, 
      })
        .status(200)
        .json({ status: 'Success', message: 'Logged out successfully' })

    } catch (error) {
      next(error)
    }
  }
}

export {
  adminLogout
}