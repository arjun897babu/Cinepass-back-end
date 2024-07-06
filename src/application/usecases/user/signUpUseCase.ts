import { UserEntity } from "../../../domain/entities/user/IUserEntity"
import { IDependencies } from "../../interface/user/IDependencies"

const signupUseCase = (dependencies:IDependencies)=>{
     const {repositories:{signUp}} = dependencies
  return {
    execute:async (data:UserEntity)=>{

      try {
        return  await signUp(data)
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  signupUseCase
}