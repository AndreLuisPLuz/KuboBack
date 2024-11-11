import "dotenv/config";
import { v2 as cloudinary } from 'cloudinary';
import ImageUploadService, { UploadResult } from "../../../domain/contracts/imageUploadService";

class CloudinaryService implements ImageUploadService
{
    public configure = async () => {
        const cloudName = process.env.CLOUD_NAME;
        const apiKey = process.env.CLOUD_API_KEY;
        const apiSecret = process.env.CLOUD_API_SECRET;

        cloudinary.config({
            cloud_name: cloudName, 
            api_key: apiKey, 
            api_secret: apiSecret
        });
    };

    public uploadImage = async (image: Buffer) => {
        const result = await new Promise((resolve) => {
            cloudinary.uploader.upload_stream((error, uploadResult) => {
                return resolve(uploadResult);
            }).end(image);
        });

        return result as UploadResult;
    };
}

export default CloudinaryService;