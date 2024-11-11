
type UploadResult = {
    format: string,
    imageUrl: string,
};

interface ImageUploadService {
    configure: () => Promise<void>;
    uploadImage: (image: Buffer) => Promise<UploadResult>;
};

export type { UploadResult };
export default ImageUploadService;