import { Request, Response, NextFunction } from "express"
import { IDependencies } from "../../../application/interface/user/IDependencies"

const signup = (dependencies: IDependencies) => {

  const { useCases: { signupUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      const value = req.body
      const newUser = signupUseCase(dependencies).execute(value)
      
      return res.status(201).json({
        status: true,
        message: 'Account Registered Successfully'
      })
    } catch (error) {
      next(error)
    }

  }
}

export {
  signup
}