import { ILogin } from "../../../../domain/domainUsecases";
import { AdminEntity } from "../../../../domain/entities/admin/IAdmin";
import { Admin } from "../../model/admin/admin";

const findAdmin = async (email: string): Promise<AdminEntity | null> => {
  try {
    const isAdmin = await Admin.findOne({ email }).lean()
    return isAdmin
  } catch (error) {
    throw error
  }
}

export {
  findAdmin
}
