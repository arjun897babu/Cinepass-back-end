import { NextFunction, Request, Response } from "express"

const theaterLogout = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.clearCookie('theaterJWT', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
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