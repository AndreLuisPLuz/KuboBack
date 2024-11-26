import { injected } from "brandi";
import { INFRA_TOKENS, infrastructureContainer } from "../../../infrastructure/container";

import IRepository from "../../../domain/seed/repository";
import ICommandHandler from "../../seed/commandHandler";
import NotFoundError from "../../errors/notFoundError";
import UpsertError from "../../errors/upsertError";

import Cosmetic from "../../../domain/aggregates/cosmetic/cosmetic";
import Kubo from "../../../domain/aggregates/kubo/kubo";
import Nickname from "../../../domain/aggregates/kubo/nickname";

import CreateKubo, { CreateKuboResult } from "../../commands/kubo/createKubo";
import User from "../../../domain/aggregates/user/user";

type KuboCommand =
    | CreateKubo;

class KuboCommandHandler implements ICommandHandler<CreateKuboResult, CreateKubo> {
    private repo: IRepository<Kubo>;
    private userRepo: IRepository<User>;
    private cosmeticRepo: IRepository<Cosmetic>;

    constructor(
            repository: IRepository<Kubo>,
            userRepository: IRepository<User>,
            cosmeticRepository: IRepository<Cosmetic>,
    ) {
        this.repo = repository;
        this.userRepo = userRepository;
        this.cosmeticRepo = cosmeticRepository;
    }

    solveDependencies = (): void => {
        this.repo = infrastructureContainer.get(INFRA_TOKENS.kuboRepository);
        this.userRepo = infrastructureContainer.get(INFRA_TOKENS.userRepository);
        this.cosmeticRepo = infrastructureContainer.get(INFRA_TOKENS.cosmeticRepository);
    };

    async handleAsync(command: CreateKubo): Promise<CreateKuboResult>;

    public async handleAsync(command: KuboCommand): Promise<CreateKuboResult> {
        this.solveDependencies();

        switch(command.concreteType) {
            case "CreateKubo": return await this.handleCreateKubo(command);
        }
    }

    private async handleCreateKubo(command: CreateKubo): Promise<CreateKuboResult> {
        const checkCosmetic = async (cosmeticId: string) => {
            const exists = await this.cosmeticRepo.existsAsync(cosmeticId);

            if (!exists)
                throw new NotFoundError("Cosmetics not found.");
        };

        const userExists = this.userRepo.existsAsync(command.userId);

        if (!userExists)
            throw new NotFoundError("User not found.");
    
        await checkCosmetic(command.eyesId);
        await checkCosmetic(command.hatId);

        const newKubo = Kubo.createNew({
            ...command.props,
            nickname: Nickname.createNew({ value: command.nickname }),
        });

        const savedKubo = await this.repo.upsertAsync(newKubo);

        if (savedKubo == null)
            throw new UpsertError("Could not insert new Kubo.");

        return {
            data: { id: savedKubo._id },
            message: "Kubo saved with success."
        };
    }
}

injected(
    KuboCommandHandler,
    INFRA_TOKENS.kuboRepository,
    INFRA_TOKENS.userRepository,
    INFRA_TOKENS.cosmeticRepository,
);

export default KuboCommandHandler;