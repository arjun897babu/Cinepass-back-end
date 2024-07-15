import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('middle ware called');

    const { userJWT } = req.cookies;
    console.log(userJWT)
    if (!userJWT) {
      throw new CustomError('Access Denied', 401, 'tokenError')
    }

    const decoded = verifyToken(userJWT, config.secrets.access_token);
    if(decoded){
      console.log('jwt decoded',decoded)
    }
    next()

  } catch (error) {
    throw error
  }
}

export{
  verifyUser
}