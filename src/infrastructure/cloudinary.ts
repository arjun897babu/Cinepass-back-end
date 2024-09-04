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
    .then(result => result.secure_url )
    .catch(error => {
      console.error('Error Cloudinary:', error);
      throw new CustomError('image uploading failed', 500, 'uploadError');
    });
}

interface ImageUploadResult {
  secure_url: string;
  public_id: string;
}

const uploadImage2 = async (image: string, folder: Role): Promise<ImageUploadResult> => {
  console.log('image uploading function is called')
  return v2.uploader.upload(image, { folder })
    .then(result => ( {
      secure_url: result.secure_url,
      public_id: result.public_id
    }) )
    .catch(error => {
      console.error('Error Cloudinary:', error);
      throw new CustomError('image uploading failed', 500, 'uploadError');
    });
}

export {
  uploadImage,
   uploadImage2
}