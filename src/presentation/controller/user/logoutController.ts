import { NextFunction, Request, Response } from "express";
import { Cookie } from "../../../utils/jwtHandler";
const logout = () => {

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      res.clearCookie(Cookie.userJWT, {
        httpOnly: true, 
      })
        .status(200)
        .json({ status: 'Success', message: 'user logout' })
    } catch (error) {
      next(error)
    }

  }

}

export {
  logout
}