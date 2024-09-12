import { NextFunction, Request, Response } from "express";
import { Cookie } from "../../../utils/jwtHandler";
import { HttpStatusCode } from "../../../utils/enum";
const logout = () => {

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      res.clearCookie(Cookie.userJWT, {
        httpOnly: true, 
      })
        .status(HttpStatusCode.OK)
        .json({ status: 'Success', message: 'user logout' })
    } catch (error) {
      next(error)
    }

  }

}

export {
  logout
}