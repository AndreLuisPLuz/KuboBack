import { INFRA_TOKENS, infrastructureContainer } from "../../infrastructure/container";
import { injected } from "brandi";

import User from "../../domain/aggregates/user/user";
import IRepository from "../../domain/seed/repository";
import IQueryHandler from "../seed/queryHandler";
import NotFoundError from "../errors/notFoundError";

import GetUserDetails, { UserDetails } from "../queries/getUserDetails";

type UserQuery =
    | GetUserDetails;

class UserQueryHandler implements IQueryHandler<UserDetails, GetUserDetails> {
    private repo: IRepository<User>;

    constructor(repo: IRepository<User>) {
        this.repo = repo;
    }

    solveDependencies = (): void => {
        this.repo = infrastructureContainer.get(INFRA_TOKENS.userRepository);
    };

    async handleAsync(query: GetUserDetails): Promise<UserDetails>;

    async handleAsync(query: UserQuery): Promise<UserDetails> {
        this.solveDependencies();

        switch (query.concreteType) {
            case "GetUserDetails": return await this.handleGetUserDetails(query);
        }
    }

    private async handleGetUserDetails(query: GetUserDetails): Promise<UserDetails> {
        const user = await this.repo.findAsync(query.id);

        if (user == null)
            throw new NotFoundError("User not found.");

        return {
            id: user._id,
            username: user.username,
            email: user.email,
        };
    }
}

injected(UserQueryHandler, INFRA_TOKENS.userRepository);

export default UserQueryHandler;