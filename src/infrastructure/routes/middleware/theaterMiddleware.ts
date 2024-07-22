import { NextFunction, Request, Response } from "express"
import { Cookie, verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";
import { CustomError } from "../../../utils/CustomError";
import { mongodbIdValidator } from "../../../utils/validator";

const verifyTheaterOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('theater middleware is called');
    const theaterJWT = req.cookies[Cookie.theaterJWT]
    console.log('theater jwt:', theaterJWT);
    const decoded = verifyToken(theaterJWT, config.secrets.access_token);
    if (!decoded._id) {
      throw new CustomError('Unauthorized', 401, 'token')
    }
    next();
  } catch (error) {
    next(error)
  }
};
const verifyTheaterResetPasswordRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('reaching verify Reset-Password Request middleware')
    const { token } = req.params;
    if (!token) {
      throw new CustomError('Something went wrong', 401, 'token')
    }
    const decoded = verifyToken(token, config.secrets.short_lived_access_token);
    if (!decoded._id) {
      throw new CustomError('Something went wrong', 401, 'token')
    }

    mongodbIdValidator(decoded._id);
    req.params.token = decoded._id
    next()

  } catch (error) {
    next(error)
  }
}

export {
  verifyTheaterOwner,
  verifyTheaterResetPasswordRequest
}