import { NextFunction, Request, Response } from "express"
import { Cookie, verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";
import { CustomError } from "../../../utils/CustomError";

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('admin middle ware is called')
    const adminJWT = req.cookies[Cookie.adminJWT];
    if (!adminJWT) {
      throw new CustomError('Access Denied', 403, 'token')
    }
    const decoded = verifyToken(adminJWT, config.secrets.access_token)
    if (!decoded._id) {
      throw new CustomError('Access Denied', 401, 'tokenError')
    }
    next()

  } catch (error) {
    next(error)
  }
}

export {
  verifyAdmin
}