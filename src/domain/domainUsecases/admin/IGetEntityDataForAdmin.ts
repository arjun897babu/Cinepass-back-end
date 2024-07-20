import { IResponse } from "..";
import { Role } from "../../../utils/enum";

interface IGetEntityDataForAdmin {
  execute: (role: Role.user | Role.theaters) => Promise<IResponse>
}
export{
  IGetEntityDataForAdmin
}