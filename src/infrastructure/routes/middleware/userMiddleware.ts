import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { Cookie, verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";
import { Users } from "../../database/model/user/userSchema";
import { TokenExpiredError } from "jsonwebtoken";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('user middle ware called');

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

export {
  verifyUser
}