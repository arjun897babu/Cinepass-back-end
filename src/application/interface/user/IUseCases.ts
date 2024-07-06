import { ISignUp } from "../../../domain/usecases/user/ISignUp"

interface IUseCases {
  signupUseCase: (dependencies: any) => ISignUp
}

export {
  IUseCases
}