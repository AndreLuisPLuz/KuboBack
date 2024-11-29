import "dotenv/config";
import { v2 as cloudinary } from 'cloudinary';
import IImageUploadService, { UploadResult } from "../../../domain/contracts/imageUploadService";

class CloudinaryService implements IImageUploadService
{
    private configured: boolean = false;

    private configure = async () => {
        const cloudName = process.env.CLOUD_NAME;
        const apiKey = process.env.CLOUD_API_KEY;
        const apiSecret = process.env.CLOUD_API_SECRET;

        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret
        });

        this.configured = true
    };

    public uploadImage = async (image: Buffer): Promise<UploadResult> => {
        if (!this.configured)
            await this.configure();

        const result: any = await new Promise((resolve) => {
            cloudinary.uploader.upload_stream((_, uploadResult) => {
                return resolve(uploadResult);
            }).end(image);
        });

        return {
            format: result.format,
            imageUrl: result.secure_url
        };
    };
}

export default CloudinaryService;