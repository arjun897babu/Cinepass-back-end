import { IResetPassword } from "../../../../utils/interface";
import { TheaterOwner } from "../../model/theaters";

const resetPasswordTheaters = async (payload: IResetPassword): Promise<boolean> => {

  try {
    const updated = await TheaterOwner.findOneAndUpdate({ _id: payload._id }, { password: payload.password }).lean();
    return !!updated

  } catch (error) {
    throw error
  }

}


export {
  resetPasswordTheaters
}