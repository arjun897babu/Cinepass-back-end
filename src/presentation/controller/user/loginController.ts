import { NextFunction, Request, Response } from "express"
import { validateEmail, validatePassword } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";
import { IDependencies } from "../../../application/interface/user/IDependencies";

const login = (dependencies: IDependencies) => {
  const { useCases: { loginUseCase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      //validate email
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new CustomError(emailValidation.message, 400,'email')
      }

      //validate password
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new CustomError(passwordValidation.message, 400,'email')
      }

      const response = await loginUseCase(dependencies).execute(email, password);

      if (response.status === 'error') {

        return res.status(403).json({
          status: response.status,
          message: response.message,
          redirectURL: response.redirectURL
        });
      }

      const { accessToken, refreshToken } = response
      console.log('in use cased',response.data)

      return res.cookie('userJWT', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000
      })
        .status(200).json({
          status: response.status,
          accessToken,
          message: response.message,
          data: response.data
        })


    } catch (error) {
      next(error)
    }
  }
}

export {
  login
}