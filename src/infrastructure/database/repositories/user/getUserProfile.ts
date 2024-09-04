import { Types } from "mongoose"
import { UserEntity } from "../../../../domain/entities/user/IUserEntity"
import { Users } from "../../model/user/userSchema"
import { CustomError } from "../../../../utils/CustomError";



const getUserProfile = async (_id: string): Promise<UserEntity> => {
  try {
    const user = await Users.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(_id)
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          mobile_number: 1,
          profile_picture: 1,
        }
      }
    ]); 
    
    if (user.length === 0) {
      throw new CustomError('no user found', 404, 'user')
    }
    return user[0]
  } catch (error) {
    throw error
  }
}

export {
  getUserProfile
}