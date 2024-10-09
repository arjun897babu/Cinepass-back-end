import { v2 } from 'cloudinary'
import { config } from '../config/envConfig';
import { HttpStatusCode, Role } from '../utils/enum';
import { CustomError } from '../utils/CustomError';
import { IHlsUrlResponse } from '../domain/domainUsecases/user';


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

export interface ImageUploadResult {
  secure_url: string;
  public_id: string;
}

const uploadImage2 = async (image: string, folder: Role): Promise<ImageUploadResult> => {
  console.log('image uploading function is called')
  return v2.uploader.upload(image, { folder })
    .then(result => ({
      secure_url: result.secure_url,
      public_id: result.public_id
    }))
    .catch(error => {
      console.error('Error Cloudinary:', error);
      throw new CustomError('image uploading failed', 500, 'uploadError');
    });
}

const uploadVideo = async (videoPath: string, folder: Role): Promise<ImageUploadResult> => {
  try {
    const result = await v2.uploader.upload(videoPath, {
      resource_type: 'video',
      chunk_size: 10 * 1024 * 1024,
      eager: [
        { streaming_profile: 'full_hd', format: 'm3u8' }
      ],
      eager_async: true,
    });

    console.log('Cloudinary Upload Complete:', result);

    if (!result.secure_url || !result.public_id) {
      throw new CustomError('Unexpected Error: Missing secure_url or public_id', HttpStatusCode.INTERNAL_SERVER_ERROR, 'video');
    }

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    } as ImageUploadResult;

  } catch (error) {
    console.error('Error during video upload:', error);
    throw new CustomError('Video uploading failed', 500, 'uploadError');
  }
};


const getHlsUrl =  (publicId: string, movieId: string, _id: string): IHlsUrlResponse => {
  const hlsURL =  v2.url(publicId, {
    resource_type: 'video',
    format: 'm3u8',
  })

  return {
    hlsURL
  }
}

export {
  getHlsUrl,
  uploadVideo,
  uploadImage,
  uploadImage2
}