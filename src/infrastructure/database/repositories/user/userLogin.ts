
import { Users } from "../../model/user/userSchema";
import { UserEntity } from "../../../../domain/entities/user/IUserEntity";

const login = async (email: string): Promise<UserEntity | null> => {
  try {
    const existingUser = await Users.findOne({ email }).lean();
    console.log(existingUser)
    return existingUser
  } catch (error) {
    throw error
  }
}

export {
  login
}