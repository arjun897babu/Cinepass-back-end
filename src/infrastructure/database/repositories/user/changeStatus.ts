import { Users } from "../../model/user/userSchema"


const changeUserStatus = async (email: string, verified: boolean): Promise<boolean> => {

  try {
    const isUpdated = await Users.findOneAndUpdate({ email }, { verified: !verified })

    return !!isUpdated
  }
  catch (error) {
    throw error
  }
}

export {
  changeUserStatus
}