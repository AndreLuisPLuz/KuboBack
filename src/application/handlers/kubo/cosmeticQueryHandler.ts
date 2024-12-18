import { injected } from "brandi";
import { INFRA_TOKENS, infrastructureContainer } from "../../../infrastructure/container";
import { ICosmetic } from "../../../infrastructure/schemas/cosmetic/cosmeticSchema";

import Cosmetic from "../../../domain/aggregates/cosmetic/cosmetic";
import IRepository from "../../../domain/seed/repository";
import IQueryHandler from "../../seed/queryHandler";
import NotFoundError from "../../errors/notFoundError";
import pagination from "../../crossCutting/builders/pagination";
import CriteriaBuilder from "../../crossCutting/builders/criteriaBuilder";

import GetCosmeticDetails, { CosmeticDetails } from "../../queries/kubo/getCosmeticDetails";
import GetManyCosmetics, { ManyCosmetics } from "../../queries/kubo/getManyCosmetics";
import { ICosmeticType } from "../../../infrastructure/schemas/cosmetic/cosmeticTypeSchema";

type CosmeticQuery =
    | GetCosmeticDetails
    | GetManyCosmetics;

class CosmeticQueryHandler implements
        IQueryHandler<CosmeticDetails, GetCosmeticDetails>,
        IQueryHandler<ManyCosmetics, GetManyCosmetics> {
    private repo: IRepository<Cosmetic>;

    constructor(repository: IRepository<Cosmetic>) {
        this.repo = repository;
    }

    solveDependencies = (): void => {
        this.repo = infrastructureContainer.get(
            INFRA_TOKENS.cosmeticRepository
        );
    };

    async handleAsync(query: GetCosmeticDetails): Promise<CosmeticDetails>;
    async handleAsync(query: GetManyCosmetics): Promise<ManyCosmetics>;

    async handleAsync(query: CosmeticQuery): Promise<CosmeticDetails | ManyCosmetics> {
        this.solveDependencies();

        switch (query.concreteType) {
            case "GetCosmeticDetails": return await this.handleGetCosmeticDetails(query);
            case "GetManyCosmetics": return await this.handleGetManyCosmetics(query);
        }
    };

    private async handleGetCosmeticDetails(query: GetCosmeticDetails): Promise<CosmeticDetails> {
        const cosmetic = await this.repo.findAsync(query.id);

        if (cosmetic == null)
            throw new NotFoundError("Cosmetic not found.");
    
        return {
            data: {
                id: cosmetic._id,
                name: cosmetic.name,
                imagePath: cosmetic.imagePath,
                type: cosmetic.type.type
            },
            message: "Cosmetic option details found.",
        };
    }

    private async handleGetManyCosmetics(query: GetManyCosmetics): Promise<ManyCosmetics> {
        const type: ICosmeticType | undefined = query.type
            ? { type: query.type }
            : undefined

        const criteriaBuilder = new CriteriaBuilder<ICosmetic>();
        const criteria = criteriaBuilder
            .tryAdd("type", type)
            .build();

        const cosmeticsFetch = await this.repo.findManyAsync(
            criteria,
            pagination(query.page, query.size),
        );

        return {
            data: cosmeticsFetch.data.map(c => ({
                id: c._id,
                name: c.name,
                type: c.type.type,
                imagePath: c.imagePath
            })),
            message: "List of cosmetics found.",
            currentPage: cosmeticsFetch.currentPage,
            totalPages: cosmeticsFetch.totalPages,
            items: cosmeticsFetch.items,
        };
    }
}

injected(CosmeticQueryHandler, INFRA_TOKENS.cosmeticRepository);

export default CosmeticQueryHandler;