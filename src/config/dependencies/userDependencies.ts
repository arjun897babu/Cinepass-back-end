import { IDependencies } from "../../application/interface/user/IDependencies";
import * as useCases from '../../application/applicationUsecases/user'
import * as repositories from '../../infrastructure/database/repositories/user'

const dependencies: IDependencies = {
 repositories,
 useCases
}


export { dependencies }