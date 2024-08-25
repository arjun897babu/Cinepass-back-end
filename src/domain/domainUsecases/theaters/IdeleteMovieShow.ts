import { IResponse2 } from "..";

export interface IDeleteEntityResponse extends IResponse2 {
  data: { _id: string }
}
interface IDeleteMovieShow {
  execute: (showId: string) => Promise<IDeleteEntityResponse>
}

export {
  IDeleteMovieShow
}