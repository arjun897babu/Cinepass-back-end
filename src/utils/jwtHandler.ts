import { sign, verify, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "./CustomError";
import { Role } from "./enum";
import { TokenPayload } from "./interface";


enum Cookie {
  adminJWT = 'adminJWT',
  userJWT = 'userJWT',
  theaterJWT = 'theaterJWT',
}
enum RefreshJWT {
  ADMIN_REFRESH = 'adminRefreshJWT',
  USER_REFRESH = 'userRefreshJWT',
  THEATER_REFRESH = 'theaterRefreshJWT',
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
    throw new CustomError('Unauthorized', 401, 'token')
  }
};


export {
  generateToken,
  verifyToken,
  Cookie,
  RefreshJWT
};
