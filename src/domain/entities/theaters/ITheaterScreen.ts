import { ObjectId } from "mongoose";

interface ISeat {
  name: string,
  available: boolean,
}

interface ITheaterScreen {
  _id?: ObjectId;
  theaterId?: ObjectId
  screen_name: string,
  seating_capacity: number,
  rows: number,
  column: number,
  amenity:string,
  chargePerSeat: number
  listed:boolean
  layout: Array<Array<ISeat>>;
}

export {
  ITheaterScreen,
  ISeat
}