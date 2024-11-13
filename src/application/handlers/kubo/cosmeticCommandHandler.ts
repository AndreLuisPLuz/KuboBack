import { injected } from "brandi";
import { INFRA_TOKENS, infrastructureContainer } from "../../../infrastructure/container";

import ICommandHandler from "../../seed/commandHandler";

import IRepository from "../../../domain/seed/repository";
import IImageUploadService from "../../../domain/contracts/imageUploadService";
import Cosmetic from "../../../domain/aggregates/cosmetic/cosmetic";
import { CosmeticType, Type } from "../../../domain/aggregates/cosmetic/cosmeticType";

import CreateCosmetic from "../../commands/kubo/createCosmetic";
import DeleteCosmetic from "../../commands/kubo/deleteCosmetic";

import UpsertError from "../../errors/upsertError";

type CosmeticCommand = 
    | CreateCosmetic
    | DeleteCosmetic;

class CosmeticCommandHandler
    implements
        ICommandHandler<string, CreateCosmetic>,
        ICommandHandler<boolean, DeleteCosmetic> {
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
    async handleAsync(command: DeleteCosmetic): Promise<boolean>;

    public async handleAsync(command: CosmeticCommand): Promise<string | boolean> {
        this.solveDependencies();

        switch (command.concreteType) {
            case "CreateCosmetic": return await this.handleCreateCosmetic(command);
            case "DeleteCosmetic": return await this.handleDeleteCosmetic(command);
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

    private handleDeleteCosmetic = async (command: DeleteCosmetic): Promise<boolean> => {
        const success = await this.repo.deleteAsync(command.id);
        return(success);
    };
}

injected(
    CosmeticCommandHandler,
    INFRA_TOKENS.cosmeticRepository,
    INFRA_TOKENS.imageUploadService
);

export default CosmeticCommandHandler;