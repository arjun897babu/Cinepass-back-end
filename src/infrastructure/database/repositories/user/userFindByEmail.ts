import { Users } from "../../model/user/userSchema";

const findByEmail = async (email: string): Promise<boolean> => {

  try {
    const isUser = await Users.exists({ email });
   
    return !!isUser
  } catch (error) {
    throw error
  }

}
export {
  findByEmail
}