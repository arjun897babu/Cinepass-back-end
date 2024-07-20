import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { validateEmail } from "../../../utils/validator";
import { platform } from "os";
import { CustomError } from "../../../utils/CustomError";
import { Cookie } from "../../../utils/jwtHandler";

const theaterLogin = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { theaterLoginUseCase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      const payload = req.body
      const emailValidation = validateEmail(payload.email);
      if (!emailValidation.isValid) {
        throw new CustomError(emailValidation.message, 400, 'email')
      }
      const response = await theaterLoginUseCase(dependencies).execute(payload);

      if (response.status === 'Error') {

        return res.status(403).json({

          status: response.status,
          message: response.message,
          redirectURL: response.redirectURL,
          data: response.data
        });
      }

      return res.cookie(Cookie.theaterJWT, response.accessToken, {

        httpOnly: true,
        sameSite: "lax",
        maxAge: 24*60 * 60 * 1000

      })
        .status(200).json({
          status: response.status,
          message: response.message,
          data: response.data,
          redirectURL:response.redirectURL
        });

    } catch (error) {
      next(error)
    }

  }
}

export {
  theaterLogin
}