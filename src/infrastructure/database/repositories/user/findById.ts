
import { Users } from "../../model/user/userSchema";
 
const findUserById= async (_id: string): Promise<string | undefined> => {
  try {
    const existingUser = await Users.exists({ _id })
    if (existingUser) { return existingUser._id?.toString() }
    return undefined
  } catch (error) {
    throw error
  }
}

export {
  findUserById
}