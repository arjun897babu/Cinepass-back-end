import { UserEntity } from "../../../../domain/entities/user/IUserEntity"
import { CustomError } from "../../../../utils/CustomError"
import { Role } from "../../../../utils/enum"
import { uploadImage } from "../../../cloudinary"
import { Users } from "../../model/user/userSchema"

const updateUserProfile = async (_id: string, payload: Partial<UserEntity>): Promise<Partial<UserEntity>> => {
  try {

    if (payload.profile_picture) {
      const profile_picture_url = await uploadImage(payload.profile_picture, Role.users)
      payload.profile_picture = profile_picture_url
    }

    const updatedData = await Users
      .findByIdAndUpdate(
        _id,
        { $set: { ...payload } },
        { new: true }
      )
      .select('profile_picture name mobile_number email -_id ')
      .lean()

    if (!updatedData) {
      throw new CustomError('user not found', 404, '')
    }
    console.log(updatedData)
    return updatedData

  } catch (error) {
    throw error
  }
}

export {
  updateUserProfile
}