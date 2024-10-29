import { injected } from "brandi";
import { INFRA_TOKENS, infrastructureContainer } from "../../infrastructure/container";

import IUserRepository from "../../domain/aggregates/user/contracts/userRepository";
import IRepository from "../../domain/seed/repository";
import ICommandHandler from "../seed/commandHandler";
import NotFoundError from "../errors/notFoundError";
import UpsertError from "../errors/upsertError";

import Cosmetic from "../../domain/aggregates/cosmetic/cosmetic";
import Kubo from "../../domain/aggregates/kubo/kubo";
import Nickname from "../../domain/aggregates/kubo/nickname";

import CreateKubo from "../commands/createKubo";
import User from "../../domain/aggregates/user/user";

type KuboCommand =
    | CreateKubo;

class KuboCommandHandler implements ICommandHandler<string, CreateKubo> {
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

    async handleAsync(command: CreateKubo): Promise<string>;

    public async handleAsync(command: KuboCommand): Promise<string> {
        this.solveDependencies();

        switch(command.concreteType) {
            case "CreateKubo": return await this.handleCreateKubo(command);
        }
    }

    private async handleCreateKubo(command: CreateKubo): Promise<string> {
        const userExists = this.userRepo.existsAsync(command.userId);

        if (!userExists)
            throw new NotFoundError("User not found.");
    
        const eyesExist = this.cosmeticRepo.existsAsync(command.eyesId);
        const hatExists = this.cosmeticRepo.existsAsync(command.hatId);

        if (!eyesExist || !hatExists)
            throw new NotFoundError("Cosmetics not found.");

        const newKubo = Kubo.createNew({
            userId: command.userId,
            nickname: Nickname.createNew({ value: command.nickname }),
            color: command.color,
            eyesId: command.eyesId,
            hatId: command.hatId
        });

        const savedKubo = await this.repo.upsertAsync(newKubo);

        if (savedKubo == null)
            throw new UpsertError("Could not insert new Kubo.");

        return savedKubo._id;
    }
}

injected(
    KuboCommandHandler,
    INFRA_TOKENS.kuboRepository,
    INFRA_TOKENS.userRepository,
    INFRA_TOKENS.cosmeticRepository,
);

export default KuboCommandHandler;