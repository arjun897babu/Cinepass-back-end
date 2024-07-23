import { sign, verify, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "./CustomError";
import { Role } from "./enum";
import { TokenPayload } from "./interface";


enum Cookie {
  adminJWT = 'adminJWT',
  userJWT = 'userJWT',
  theaterJWT = 'theaterJWT',
}





const generateToken = (payload: TokenPayload, secret: string, expiresIn: string): string => {

  return sign({ ...payload }, secret, { expiresIn: expiresIn });

};

const verifyToken = (token: string, secret: string): JwtPayload => {
  try {

    return verify(token, secret) as JwtPayload;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new CustomError('Token expired', 401, 'token')
    }
    throw new CustomError('Unauthorized', 500, 'token')
  }
};


export {
  generateToken,
  verifyToken,
  Cookie
};
