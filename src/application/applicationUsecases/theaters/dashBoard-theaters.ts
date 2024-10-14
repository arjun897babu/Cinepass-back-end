import { ResponseStatus } from "../../../utils/enum";
import { RevenueByFilter } from "../../../utils/interface";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const getCountStat = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { getScreenCount, getShowCountByScreen, getTicketCount } } = dependencies

  return {
    execute: async (theaterId: string) => {
      try {
        const [screenStat, showStat, ticketStat] = await Promise.all([getScreenCount(theaterId), getShowCountByScreen(theaterId), getTicketCount(theaterId)])

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Data fetched successfully',
          data: {
            screenStat,
            showStat,
            ticketStat
          }
        }

      } catch (error) {
        throw error
      }
    }
  }
}

const getRevenueByScreen = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { getRevenueByScreen } } = dependencies

  return {
    execute: async (theaterId: string, filter: RevenueByFilter) => {
      try {

        const data = await getRevenueByScreen(theaterId, filter)
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Data fetched successfully',
          data: data
        }

      } catch (error) {
        throw error
      }
    }
  }
}


export {
  getCountStat,
  getRevenueByScreen
}