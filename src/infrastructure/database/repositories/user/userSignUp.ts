import { Users } from "../../model/user/userSchema";
import { UserEntity } from "../../../../domain/entities/user/IUserEntity";

const signUp = async (data: UserEntity): Promise<UserEntity | null> => {

  try {

    const newUser = await Users.create(data);

    if (!newUser) {
      throw new Error('User creation failed')
    }

    return newUser

  } catch (error) {

    throw error
  }
}

export { signUp }