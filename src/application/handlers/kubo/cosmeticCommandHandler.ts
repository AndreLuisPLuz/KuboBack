import { injected } from "brandi";
import { INFRA_TOKENS, infrastructureContainer } from "../../../infrastructure/container";

import ICommandHandler from "../../seed/commandHandler";

import IRepository from "../../../domain/seed/repository";
import IImageUploadService from "../../../domain/contracts/imageUploadService";
import Cosmetic from "../../../domain/aggregates/cosmetic/cosmetic";
import { CosmeticType, Type } from "../../../domain/aggregates/cosmetic/cosmeticType";

import CreateCosmetic, { CreateCosmeticResult } from "../../commands/kubo/createCosmetic";
import DeleteCosmetic, { DeleteCosmeticResult } from "../../commands/kubo/deleteCosmetic";

import UpsertError from "../../errors/upsertError";
import Kubo from "../../../domain/aggregates/kubo/kubo";
import CriteriaBuilder from "../../crossCutting/builders/criteriaBuilder";
import DeleteReferenceError from "../../errors/deleteReferenceError";
import NotFoundError from "../../errors/notFoundError";

type CosmeticCommand = 
    | CreateCosmetic
    | DeleteCosmetic;

class CosmeticCommandHandler
    implements
        ICommandHandler<CreateCosmeticResult, CreateCosmetic>,
        ICommandHandler<DeleteCosmeticResult, DeleteCosmetic> {
    private repo: IRepository<Cosmetic>;
    private kuboRepo: IRepository<Kubo>;
    private imageUploadService: IImageUploadService;
    private criteriaBuilder: CriteriaBuilder<Kubo>;

    constructor (
            repository: IRepository<Cosmetic>,
            kuboRepositoru: IRepository<Kubo>,
            imageUploadService: IImageUploadService
    ) {
        this.repo = repository;
        this.kuboRepo = kuboRepositoru;
        this.imageUploadService = imageUploadService;
        this.criteriaBuilder = new CriteriaBuilder();
    }

    solveDependencies = () => {
        this.repo = infrastructureContainer.get(INFRA_TOKENS.cosmeticRepository);
    };

    async handleAsync(command: CreateCosmetic): Promise<CreateCosmeticResult>;
    async handleAsync(command: DeleteCosmetic): Promise<DeleteCosmeticResult>;

    public async handleAsync(command: CosmeticCommand): Promise<CreateCosmeticResult | DeleteCosmeticResult> {
        this.solveDependencies();

        switch (command.concreteType) {
            case "CreateCosmetic": return await this.handleCreateCosmetic(command);
            case "DeleteCosmetic": return await this.handleDeleteCosmetic(command);
        } 
    }

    private handleCreateCosmetic = async (command: CreateCosmetic): Promise<CreateCosmeticResult> => {
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

        return {
            data: { id: savedCosmetic._id },
            message: "Cosmetic saved with success.",
        };
    }

    private handleDeleteCosmetic = async (command: DeleteCosmetic): Promise<void> => {
        const usedAsEyes = await this.kuboRepo.existsByCriteriaAsync(
            this.criteriaBuilder.tryAdd("eyesId", command.id).build()
        );

        const usedAsHat = await this.kuboRepo.existsByCriteriaAsync(
            this.criteriaBuilder.tryAdd("hatId", command.id).build()
        );

        if (usedAsEyes || usedAsHat)
            throw new DeleteReferenceError("Cannot delete; kubos already have references to this cosmetic.");

        var success = await this.repo.deleteAsync(command.id);

        if (!success)
            throw new NotFoundError("Cosmetic not found.");
    };
}

injected(
    CosmeticCommandHandler,
    INFRA_TOKENS.cosmeticRepository,
    INFRA_TOKENS.kuboRepository,
    INFRA_TOKENS.imageUploadService
);

export default CosmeticCommandHandler;