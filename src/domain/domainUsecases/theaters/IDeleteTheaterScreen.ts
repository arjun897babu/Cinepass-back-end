import { IDeleteEntityResponse } from "./IdeleteMovieShow";


interface IDeleteTheaterScreen {
  execute: (screenId: string) => Promise<IDeleteEntityResponse>
}


export{
  IDeleteTheaterScreen
}