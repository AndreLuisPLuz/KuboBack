import { injected } from "brandi";
import Kubo from "../../domain/aggregates/kubo/kubo";
import IRepository from "../../domain/seed/repository";
import GetKuboDetails, { KuboDetails } from "../queries/getKuboDetails";
import IQueryHandler from "../seed/queryHandler";
import { INFRA_TOKENS, infrastructureContainer } from "../../infrastructure/container";
import CriteriaBuilder from "../crossCutting/builders/criteriaBuilder";
import { IKubo } from "../../infrastructure/schemas/kubo/kuboSchema";
import NotFoundError from "../errors/notFoundError";
import Cosmetic from "../../domain/aggregates/cosmetic/cosmetic";
import KuboMapper from "../mapping/kuboMapper";

class KuboQueryHandler implements IQueryHandler<KuboDetails, GetKuboDetails> {
    private repo: IRepository<Kubo>;
    private cosmeticRepo: IRepository<Cosmetic>;

    constructor(
            repository: IRepository<Kubo>,
            cosmeticRepository: IRepository<Cosmetic>,
    ) {
        this.repo = repository;
        this.cosmeticRepo = cosmeticRepository;
    }

    solveDependencies = (): void => {
        this.repo = infrastructureContainer.get(INFRA_TOKENS.kuboRepository);
    }

    async handleAsync(query: GetKuboDetails): Promise<KuboDetails> {
        const kubo = await this.repo.findOneAsync(
            new CriteriaBuilder<IKubo>()
                .tryAdd("userId", query.userId)
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
)

export default KuboQueryHandler;