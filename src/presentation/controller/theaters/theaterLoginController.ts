import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { validateEmail } from "../../../utils/validator";
import { platform } from "os";
import { CustomError } from "../../../utils/CustomError";
import { Cookie } from "../../../utils/jwtHandler";
import { HttpStatusCode } from "../../../utils/enum";

const theaterLogin = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { theaterLoginUseCase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      const payload = req.body
      validateEmail(payload.email);

      const response = await theaterLoginUseCase(dependencies).execute(payload);

      if (response.status === 'Error') {
        return res.status(401).json({
          status: response.status,
          message: response.message,
          error: {
            error: 'otp',
            message: response.message,
            tempMail: response.data
          }
        })
      }

      return res.cookie(Cookie.theaterJWT, response.accessToken, {

        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000

      })
        .status(HttpStatusCode.OK).json({
          status: response.status,
          message: response.message,
          data: response.data,
          redirectURL: response.redirectURL
        });

    } catch (error) {
      next(error)
    }

  }
}

export {
  theaterLogin
}