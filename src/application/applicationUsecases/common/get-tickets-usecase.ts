import { ITheaterTicketDataResponse, IUserTicketDataResponse } from "../../../domain/domainUsecases/common";
import { CustomError } from "../../../utils/CustomError";
import { HttpStatusCode, ResponseStatus, Role } from "../../../utils/enum";
import { TicketFilter } from "../../../utils/interface";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

const getTicketDataUsecase = (dependencies: ICommonDependencies) => {
   const { theaterRepositories: { getTheaterTicketData } } = dependencies
  const { userRepositories: { getTicketData } } = dependencies
  return {
    execute: async (role: Role, _id: string, pageNumber: number, filer?: TicketFilter) => {
      try {
        
        let data

        if (role === Role.users) {
          data = await getTicketData(_id, pageNumber) as IUserTicketDataResponse
        } else if (role === Role.theaters) {
          data = await getTheaterTicketData(_id, pageNumber) as ITheaterTicketDataResponse
        }

        if (!data) {
          throw new CustomError('Tickets not booked yet', HttpStatusCode.NOT_FOUND, 'tickets')
        } 

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Ticket data fetched successfully',
          data
        }
        
      } catch (error) {
        throw error
      }
    }
  }

}

export {
  getTicketDataUsecase
}