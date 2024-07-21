import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { Cookie, verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";
import { mongodbIdValidator } from "../../../utils/validator";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('user middle ware called');

    const userJWT = req.cookies[Cookie.userJWT];
    if (!userJWT) {
      throw new CustomError('Access Denied', 401, 'tokenError')
    }

    const decoded = verifyToken(userJWT, config.secrets.access_token);
    if (!decoded._id) {
      throw new CustomError('Access Denied', 401, 'token')
    }

    next()

  } catch (error) {

    next(error)
  }
}
const verifyResetPasswordRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('reaching verify Reset-Password Request middleware')
    const { token } = req.params;
    if (!token) {
      throw new CustomError('Access Denied', 401, 'tokenError')
    }
    const decoded = verifyToken(token, config.secrets.short_lived_access_token);
    if (!decoded._id) {
      throw new CustomError('Access Denied', 401, 'token')
    }
    
    mongodbIdValidator(decoded._id);
    req.params.token = decoded._id
    next()

  } catch (error) {
    next(error)
  }
}
export {
  verifyUser,
  verifyResetPasswordRequest
}