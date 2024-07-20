import { IManageEntity, IResponse } from ".."

interface IManageEntityStatus {
  execute: (payload: IManageEntity) => Promise<IResponse>
}

export {
  IManageEntityStatus
}