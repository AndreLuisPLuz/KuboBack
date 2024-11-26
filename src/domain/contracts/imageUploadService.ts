
type UploadResult = {
    format: string,
    imageUrl: string,
};

interface IImageUploadService {
    uploadImage: (image: Buffer) => Promise<UploadResult>;
};

export type { UploadResult };
export default IImageUploadService;