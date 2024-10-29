import { injected } from "brandi";
import Cosmetic from "../../domain/aggregates/cosmetic/cosmetic";
import IRepository from "../../domain/seed/repository";
import CreateCosmetic from "../commands/createCosmetic";
import ICommandHandler from "../seed/commandHandler";
import { INFRA_TOKENS, infrastructureContainer } from "../../infrastructure/container";
import { CosmeticType, Type } from "../../domain/aggregates/cosmetic/cosmeticType";
import UpsertError from "../errors/upsertError";

type CosmeticCommand = 
    | CreateCosmetic;

class CosmeticCommandHandler implements ICommandHandler<string, CreateCosmetic> {
    private repo: IRepository<Cosmetic>;

    constructor (repository: IRepository<Cosmetic>) {
        this.repo = repository;
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
        const newCosmetic = Cosmetic.createNew({
            type: CosmeticType.getInstance(command.type as Type),
            ...command.props
        });

        const savedCosmetic = await this.repo.upsertAsync(newCosmetic);

        if (savedCosmetic == null)
            throw new UpsertError("Could not insert new cosmetic option.");

        return savedCosmetic._id;
    }
}

injected(CosmeticCommandHandler, INFRA_TOKENS.cosmeticRepository);

export default CosmeticCommandHandler;