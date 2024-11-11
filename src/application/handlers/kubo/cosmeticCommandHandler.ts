import { injected } from "brandi";
import Cosmetic from "../../../domain/aggregates/cosmetic/cosmetic";
import IRepository from "../../../domain/seed/repository";
import CreateCosmetic from "../../commands/kubo/createCosmetic";
import ICommandHandler from "../../seed/commandHandler";
import { INFRA_TOKENS, infrastructureContainer } from "../../../infrastructure/container";
import { CosmeticType, Type } from "../../../domain/aggregates/cosmetic/cosmeticType";
import UpsertError from "../../errors/upsertError";
import IImageUploadService from "../../../domain/contracts/imageUploadService";

type CosmeticCommand = 
    | CreateCosmetic;

class CosmeticCommandHandler implements ICommandHandler<string, CreateCosmetic> {
    private repo: IRepository<Cosmetic>;
    private imageUploadService: IImageUploadService;

    constructor (
            repository: IRepository<Cosmetic>,
            imageUploadService: IImageUploadService
    ) {
        this.repo = repository;
        this.imageUploadService = imageUploadService;
    }

    solveDependencies = () => {
        this.repo = infrastructureContainer.get(INFRA_TOKENS.cosmeticRepository);
    };

    async handleAsync(command: CreateCosmetic): Promise<string>;

    public async handleAsync(command: CosmeticCommand): Promise<string> {
        this.solveDependencies();

        switch (command.concreteType) {
            case "CreateCosmetic": return await this.handleCreateCosmetic(command);
        } 
    }

    private handleCreateCosmetic = async (command: CreateCosmetic): Promise<string> => {
        const image = command.image;
        const uploadResult = await this.imageUploadService.uploadImage(image);

        const newCosmetic = Cosmetic.createNew({
            type: CosmeticType.getInstance(command.type as Type),
            name: command.name,
            imagePath: uploadResult.imageUrl
        });

        const savedCosmetic = await this.repo.upsertAsync(newCosmetic);

        if (savedCosmetic == null)
            throw new UpsertError("Could not insert new cosmetic option.");

        return savedCosmetic._id;
    }
}

injected(
    CosmeticCommandHandler,
    INFRA_TOKENS.cosmeticRepository,
    INFRA_TOKENS.imageUploadService
);

export default CosmeticCommandHandler;