import { ObjectId } from "mongoose"

interface AdminEntity{
  _id?:ObjectId
  email:string,
  password:string
}

export {
  AdminEntity
}