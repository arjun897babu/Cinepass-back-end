import { NextFunction, Request, Response } from "express"
import { Cookie, verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";
import { CustomError } from "../../../utils/CustomError";
import { HttpStatusCode, Role } from "../../../utils/enum";
import { mongodbIdValidator } from "../../../utils/validator";

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  try { 
    const adminJWT = req.cookies[Cookie.adminJWT];
    if (!adminJWT) { 
      throw new CustomError('unAuthorized', 401, 'token')
    }

    const decoded = verifyToken(adminJWT, config.secrets.access_token)

    if (decoded._id && decoded.role === Role.admin) {
      mongodbIdValidator(decoded._id);
      req.params._id = decoded._id
      req.params.roles = decoded.role
       next()
    }

  } catch (error) {
    if (error instanceof CustomError) {
      if (error.statusCode === HttpStatusCode.UNAUTHORIZED) {
        res.clearCookie(Cookie.adminJWT, {
          httpOnly: true,
        })
      }
    }
    next(error)
  }
}

export {
  verifyAdmin
}