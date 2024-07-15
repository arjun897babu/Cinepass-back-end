import mongoose, { ObjectId } from "mongoose"

interface ITheaters {
  _id?:ObjectId,
  ownerId:ObjectId;
  theater_Name: string,
  theater_license: string,
  location?:string,
  images?: string[]
}

export {
ITheaters
}