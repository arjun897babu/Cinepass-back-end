// import { ITheaterOwnerEntity } from "../../../../domain/entities/theaters";
// import { CustomError } from "../../../../utils/CustomError";
// import { TheaterOwnerProfile, TheaterProfile } from "../../../../utils/interface";
//  import { TheaterOwner } from "../../model/theaters";

// const updateTheaterOwner = async (_id: string, payload: TheaterOwnerProfile): Promise<ITheaterOwnerEntity | null> => {
//   try {


//     const isExist = await TheaterOwner.exists({ email: payload.email, _id: { $ne: _id } });

//     if (isExist) {
//       throw new CustomError('email already exists', 400, 'email')
//     }

//     const updatedTheater = await TheaterOwner.findOneAndUpdate(
//       { _id },
//       {
//         $set: {
//           name: payload.name,
//           email: payload.email,
//           mobile_number: payload.mobile_number,
//           adhaar_number: payload.adhaar_number,
//         }
//       },
//       { new: true, }
//     )
//       .select('-password')
//       .lean();

//     return updatedTheater ? updatedTheater : null;
//   } catch (error) {
//     throw error;
//   }
// };

// export {
//   updateTheaterOwner
// };
