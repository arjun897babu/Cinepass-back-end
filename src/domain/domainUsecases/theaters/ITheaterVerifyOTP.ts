import {   IResponse, IOTPVerifcation } from "..";
 


interface ITheaterOTPVerify {
  execute: (data:IOTPVerifcation ) => Promise<IResponse | null>
}
export {
  ITheaterOTPVerify
}