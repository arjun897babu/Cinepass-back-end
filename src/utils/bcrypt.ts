import { hash, genSalt, compare } from "bcrypt";
 
const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword
  } catch (error) {
    throw error
  }
};


const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  try {
    const isMatch = await compare(plainPassword, hashedPassword);
    return isMatch
  } catch (error) {
    throw error
  }
}

export {
  hashPassword,
  comparePassword
}