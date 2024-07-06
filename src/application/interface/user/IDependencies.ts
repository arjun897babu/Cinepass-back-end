import { IUseCases } from "./IUseCases";
import { IRepositories } from "./IRepositories";


interface IDependencies{
  repositories:IRepositories;
  useCases:IUseCases
}


export {
  IDependencies
}