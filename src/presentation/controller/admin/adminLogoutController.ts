import { NextFunction, Request, Response } from "express"

const adminLogout = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      res.clearCookie('adminJWT', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
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