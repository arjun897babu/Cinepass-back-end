import {  LoginResponse } from "..";
import { UserEntity } from "../../entities/user/IUserEntity";

interface IGoogleAuth {
  execute: (data: UserEntity) => Promise<LoginResponse>
}

export{
  IGoogleAuth
}