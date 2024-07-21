 import { IResetPassword } from "../../../../utils/interface";
import { Users } from "../../model/user/userSchema"

const resetPassword = async (payload: IResetPassword): Promise<boolean> => {

  try {
    const updated = await Users.findOneAndUpdate({ _id: payload._id }, { password: payload.password }).lean();
    return !!updated

  } catch (error) {
    throw error
  }

}


export {
  resetPassword
}