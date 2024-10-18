import { IResponse2 } from "..";
import { IHlsUrlResponse } from "../user";

interface IGetStreamingMoviesResponse extends IResponse2 {
  data: IHlsUrlResponse
}

interface IGetStreamingUrl {
  execute: (publicId: string) => Promise<IGetStreamingMoviesResponse>
}

export {
  IGetStreamingUrl
}