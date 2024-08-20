import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { Cookie, verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";
import { mongodbIdValidator } from "../../../utils/validator";
import { Role } from "../../../utils/enum";
import { Users } from "../../database/model/user/userSchema";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('user middle ware called');

    const userJWT = req.cookies[Cookie.userJWT];
    if (!userJWT) {
      throw new CustomError('unAuthorized', 401, 'token')
    }

    const decoded = verifyToken(userJWT, config.secrets.access_token);
    if (decoded._id && decoded.role === Role.users) {
      const user = await Users.findById(decoded._id, { status: 1 })
      if (!user?.status) {
        throw new CustomError('Accout is blocked', 403, 'blocked')
      }
      req.params._id = decoded._id
      req.params.roles = decoded.role
      mongodbIdValidator(decoded._id)
      next()
    } else {
      res.clearCookie(Cookie.userJWT, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
      })
      throw new CustomError('Access Denied', 401, 'token')
    }


  } catch (error) {

    next(error)
  }
}
const verifyResetPasswordRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('reaching verify Reset-Password Request middleware')
    const { token } = req.params;
    if (!token) {
      throw new CustomError('Something went wrong', 401, 'token')
    }
    const decoded = verifyToken(token, config.secrets.short_lived_access_token);

    if (decoded._id && decoded.role === Role.users) {
      mongodbIdValidator(decoded._id);

      req.params.token = decoded._id
      next()
    } else {
      throw new CustomError('Something went wrong', 401, 'token')
    }


  } catch (error) {
    next(error)
  }
}

const isUserBlocked = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userJWT = req.cookies[Cookie.userJWT];
    if (userJWT) {
      console.log(userJWT)
      const decoded = verifyToken(userJWT, config.secrets.access_token);
      if (decoded._id && decoded.role === Role.users) {
        mongodbIdValidator(decoded._id);
        const user = await Users.findById(decoded._id, { status: 1 })
        if (!user?.status) {
          res.clearCookie(Cookie.userJWT, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
          })
          throw new CustomError('Accout is blocked', 403, 'blocked')
        }
      } else {
        res.clearCookie(Cookie.userJWT, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/'
        })
        throw new CustomError('unAutorized', 401, 'token')
      }
    }

    next()

  } catch (error) {
    if (error instanceof CustomError) {
      if (error.statusCode === 401) {
        res.clearCookie(Cookie.userJWT, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/'
        })
      }
    }
    next(error)
  }
}
export {
  verifyUser,
  verifyResetPasswordRequest,
  isUserBlocked
}