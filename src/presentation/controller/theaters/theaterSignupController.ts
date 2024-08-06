import { NextFunction, Request, Response } from "express"
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies"
import { validateAdhaar, validateEmail, validateAddress, validateCity, validateMobileNumber, validateName, validatePassword, validateTheaterLicense, validateTheaterName } from "../../../utils/validator"
import { CustomError } from "../../../utils/CustomError"

const theaterSignup = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { theaterSignupUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      //name validation
      validateName(payload.name)

      //email validation
      validateEmail(payload.email)

      //mobile number validation
      validateMobileNumber(payload.mobile_number)

      //password validation
      validatePassword(payload.password);

      //adhaar validation
      validateAdhaar(payload.adhaar_number);

      //theater name
      validateTheaterName(payload.theater_name);


      //theater license validaton
      validateTheaterLicense(payload.theater_license);

      //theater Location validation
      validateAddress(payload.address);

      //theater license validaton
      validateTheaterLicense(payload.city);


      const response = await theaterSignupUseCase(dependencies).execute(payload);

      return res.status(201).json({
        message: response?.message,
        status: response?.status,
        data: response?.data,
        redirectURL: response?.redirectURL
      })
    } catch (error) {
      next(error)
    }

  }
}

export {
  theaterSignup
}