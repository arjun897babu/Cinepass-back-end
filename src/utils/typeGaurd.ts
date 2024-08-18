import { TheaterOwnerProfile, TheaterProfile } from "./interface";

// type gaurd for theaterOwner
const isTheaterOwnerProfile = (payload: (TheaterOwnerProfile|TheaterProfile)): payload is TheaterOwnerProfile => {
  return 'name' in payload && 'mobile_number' in payload && 'email' in payload && 'adhaar_number' in payload
};

export {
  isTheaterOwnerProfile
}