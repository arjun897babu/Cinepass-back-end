import { v2 } from 'cloudinary'
import { config } from '../config/envConfig';
import { Role } from '../utils/enum';
import { CustomError } from '../utils/CustomError';


v2.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloud_api,
  api_secret: config.cloudinary.cloud_secret
});

const uploadImage = async (image: string, folder: Role): Promise<string> => {
  console.log('image uploading function is called')
  return v2.uploader.upload(image, { folder })
    .then(result => result.secure_url)
    .catch(error => {
      console.error('Error Cloudinary:', error);
      throw new CustomError('image uploading failed', 500, 'uploadError');
    });
}

export {
  uploadImage
}