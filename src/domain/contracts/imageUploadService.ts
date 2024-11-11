
type UploadResult = {
    format: string,
    imageUrl: string,
};

interface IImageUploadService {
    configure: () => Promise<void>;
    uploadImage: (image: Buffer) => Promise<UploadResult>;
};

export type { UploadResult };
export default IImageUploadService;