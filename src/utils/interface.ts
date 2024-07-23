import { Role } from "./enum"

interface IResetPassword {
  _id: string,
  password: string
}
interface TokenPayload {
  _id: string,
  role: Role
}


export {
  IResetPassword,
  TokenPayload
}