import { NextFunction, Request, Response } from "express"
import { Cookie } from "../../../utils/jwtHandler";

const theaterLogout = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.clearCookie(Cookie.theaterJWT, {
        httpOnly: true, 
      })
        .status(200).json({
          status: 'Success',
          message: 'Admin logged out successfully'
        })
    } catch (error) {
      next(error)
    }
  }
};

export{
  theaterLogout
}