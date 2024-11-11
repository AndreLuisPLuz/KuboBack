import "dotenv/config";
import { v2 as cloudinary } from 'cloudinary';

class CloudinaryService
{
    public configure = async () =>
    {
        const cloudName = process.env.CLOUD_NAME;
        const apiKey = process.env.CLOUD_API_KEY;
        const apiSecret = process.env.CLOUD_API_SECRET;

        cloudinary.config({
            cloud_name: cloudName, 
            api_key: apiKey, 
            api_secret: apiSecret
        });
    }
}

export default CloudinaryService;