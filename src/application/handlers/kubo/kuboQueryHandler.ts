import { injected } from "brandi";
import { INFRA_TOKENS, infrastructureContainer } from "../../../infrastructure/container";
import { IKubo } from "../../../infrastructure/schemas/kubo/kuboSchema";

import IRepository from "../../../domain/seed/repository";
import IQueryHandler from "../../seed/queryHandler";
import CriteriaBuilder from "../../crossCutting/builders/criteriaBuilder";
import UserContext from "../../crossCutting/contexts/userContext";
import Cosmetic from "../../../domain/aggregates/cosmetic/cosmetic";
import Kubo from "../../../domain/aggregates/kubo/kubo";
import KuboMapper from "../../mapping/kuboMapper";

import GetKuboDetails, { KuboDetails } from "../../queries/kubo/getKuboDetails";

import NotFoundError from "../../errors/notFoundError";
import NotAuthenticatedError from "../../errors/notAuthenticatedError";
import { CROSS_TOKENS, crossCuttingContainer } from "../../crossCutting/container";

type KuboQuery =
    | GetKuboDetails;

class KuboQueryHandler implements IQueryHandler<KuboDetails, GetKuboDetails> {
    private repo: IRepository<Kubo>;
    private cosmeticRepo: IRepository<Cosmetic>;
    private userContext: UserContext;

    constructor(
            repository: IRepository<Kubo>,
            cosmeticRepository: IRepository<Cosmetic>,
            userContext: UserContext
    ) {
        this.repo = repository;
        this.cosmeticRepo = cosmeticRepository;
        this.userContext = userContext;
    }

    solveDependencies = (): void => {
        this.repo = infrastructureContainer.get(INFRA_TOKENS.kuboRepository);
        this.cosmeticRepo = infrastructureContainer.get(
            INFRA_TOKENS.cosmeticRepository
        );

        this.userContext = crossCuttingContainer.get(
            CROSS_TOKENS.userContext
        );
    }

    async handleAsync(query: GetKuboDetails): Promise<KuboDetails>;

    async handleAsync(query: KuboQuery): Promise<KuboDetails> {
        this.solveDependencies();

        switch(query.concreteType) {
            case "GetKuboDetails": return await this.handleGetKuboDetails();
        }
    }

    private async handleGetKuboDetails(): Promise<KuboDetails> {
        // if (this.userContext.userId == null)
        //     throw new NotAuthenticatedError("User not authenticated.");

        const kubo = await this.repo.findOneAsync(
            new CriteriaBuilder<IKubo>()
                .tryAdd("userId", "f061df94-6397-497d-9275-6d6d6db4131f")
                .build()
        );

        if (kubo == null)
            throw new NotFoundError("Kubo not found.");

        const [eyes, hat] = await Promise.all([
            this.cosmeticRepo.findAsync(kubo.eyesId),
            this.cosmeticRepo.findAsync(kubo.hatId)
        ]);

        if (eyes == null || hat == null)
            throw new NotFoundError("Cosmetics not found.");

        return KuboMapper.toKuboDetails(kubo, eyes, hat);
    }
}

injected(
    KuboQueryHandler,
    INFRA_TOKENS.kuboRepository,
    INFRA_TOKENS.cosmeticRepository,
    CROSS_TOKENS.userContext
);

export default KuboQueryHandler;