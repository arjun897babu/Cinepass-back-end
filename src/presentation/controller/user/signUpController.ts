import { Request, Response, NextFunction } from "express"
import { IDependencies } from "../../../application/interface/user/IDependencies"
import { validateEmail, validateMobileNumber, validateName } from "../../../utils/validator"
import { CustomError } from "../../../utils/CustomError"

const signup = (dependencies: IDependencies) => {

  const { useCases: { signupUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { name, email, mobile_number, password } = req.body

      //validating name
      validateName(name);
      

      //validating email
       validateEmail(email);
       

      //validating mobile_number
     validateMobileNumber(mobile_number);
       

      const response = await signupUseCase(dependencies).execute({ name, email, mobile_number, password })

      return res.status(201).json({
        status: response?.status,
        message: response?.message,
        data:response?.data,
        redirectURL: response?.redirectURL
      });

    } catch (error) {
      next(error)
    }

  }
}

export {
  signup
}