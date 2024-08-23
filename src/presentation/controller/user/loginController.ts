import { NextFunction, Request, Response } from "express"
import { validateEmail, validatePassword } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { Cookie } from "../../../utils/jwtHandler";
import { error } from "console";

const login = (dependencies: IDependencies) => {
  const { useCases: { loginUseCase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      //validate email
      validateEmail(email);


      //validate password
      validatePassword(password);


      const response = await loginUseCase(dependencies).execute(email, password);

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

      return res.cookie(Cookie.userJWT, response.accessToken, {
        httpOnly: true,

        maxAge: 24 * 60 * 60 * 1000
      })
        .status(200).json({
          status: response.status,
          message: response.message,
          data: response.data,
          redirectURL: response.redirectURL
        })


    } catch (error) {
      next(error)
    }
  }
}

export {
  login
}