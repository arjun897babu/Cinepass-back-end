import { NextFunction, Request, Response } from "express"
import { Cookie, verifyToken } from "../../../utils/jwtHandler";
import { config } from "../../../config/envConfig";
import { CustomError } from "../../../utils/CustomError";

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


export {
  verifyTheaterOwner
}