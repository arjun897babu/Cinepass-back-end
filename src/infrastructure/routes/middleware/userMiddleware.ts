import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";
import { Users } from "../../database/model/user/userSchema";
import { TokenExpiredError } from "jsonwebtoken";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('middle ware called');

    const { userJWT } = req.cookies;
    if (!userJWT) {
      throw new CustomError('Access Denied', 401, 'tokenError')
    }

    const decoded =  verifyToken(userJWT, config.secrets.access_token);
    
    next()

  } catch (error) {
    
   next(error)
  }
}

export {
  verifyUser
}