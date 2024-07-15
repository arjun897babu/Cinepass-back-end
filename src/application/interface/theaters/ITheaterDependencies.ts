import { ITheaterRepositories, } from "./ITheaterRepositories";
import { ITheaterUseCase } from "./ITheaterUseCase";


interface ITheaterDependencies {
  theaterRepositories: ITheaterRepositories,
  theaterUseCase: ITheaterUseCase
};
export {
  ITheaterDependencies
}