
import { UserEntity } from "../../../../domain/entities/user/IUserEntity";
import { Users } from "../../model/user/userSchema";

const findUserById = async (_id: string): Promise<UserEntity | null> => {
  try {
    const existingUser = await Users.findOne({ _id }).lean()
    if (!existingUser) { return null}
    return existingUser
  } catch (error) {
    throw error
  }
}

export {
  findUserById
}