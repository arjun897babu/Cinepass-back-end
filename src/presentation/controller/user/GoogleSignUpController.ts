import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { OAuth2Client } from "google-auth-library";
import { config } from "../../../config/envConfig";
import { CustomError } from "../../../utils/CustomError";
import { Cookie } from "../../../utils/jwtHandler";
import { HttpStatusCode } from "../../../utils/enum";

const googleSignUp = (dependencies: IDependencies) => {
  const { useCases: { googleAuthUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { credential, client_id } = req.body;
      const client = new OAuth2Client(config.google.client_id);

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id
      })

      const payload = ticket.getPayload();

      if (!payload) {
        throw new CustomError('something went wrong', 400, '')
      }
      const { name, email, picture, sub: googleId } = payload
      if (!name || !picture || !email) {
        throw new CustomError('Bad request', 400, '');
      }

      const response = await googleAuthUsecase(dependencies).execute({ name, email, password: null, profile_picture: picture, googleId })
      return res.cookie(Cookie.userJWT, response.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
      })
        .status(HttpStatusCode.OK).json({
          status: response.status,
          message: response.message,
          redirectURL: response.redirectURL,
          data: response.data
        })

    } catch (error) {
      next(error)
    }
  }
}

export {
  googleSignUp
}