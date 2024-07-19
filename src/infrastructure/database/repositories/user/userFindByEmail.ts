import { UserEntity } from "../../../../domain/entities/user/IUserEntity";
import { Users } from "../../model/user/userSchema";

const findByEmail = async (email: string): Promise<UserEntity | null> => {

  try {
    const existingUser = await Users.exists({ email }).lean();

    return existingUser
  } catch (error) {
    throw error
  }

}
export {
  findByEmail
}