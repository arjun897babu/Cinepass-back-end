import { NextFunction, Request, Response } from "express";
const logout = () => {

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      res.clearCookie('userJWT', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
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