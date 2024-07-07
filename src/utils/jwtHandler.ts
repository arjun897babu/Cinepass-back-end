import { sign, verify, JwtPayload } from "jsonwebtoken";

const generateToken = (payload: string, secret: string, expiresIn: string): string => {
  console.log(payload,secret,expiresIn)
  return sign({payload}, secret, { expiresIn:expiresIn });

};

const verifyToken = (token: string, secret: string): JwtPayload | string | null => {
  try {
    return verify(token, secret);
  } catch (error) {
    return null; // Return null or handle error appropriately
  }
};

export {
  generateToken,
  verifyToken
};
