import "dotenv/config";

import { injected } from "brandi";
import { INFRA_TOKENS, infrastructureContainer } from "../../infrastructure/container";
import { APP_TOKENS, applicationContainer } from "../container";
import { SucceededAuth } from "../../domain/aggregates/user/types/authenticationResult";

import User from "../../domain/aggregates/user/user";
import ICommandHandler from "../seed/commandHandler";
import RegisterUser from "../commands/registerUser";
import AuthenticateUser from "../commands/authenticateUser";
import UpsertError from "../errors/upsertError";
import Password from "../../domain/aggregates/user/password";
import IUserRepository from "../../domain/aggregates/user/contracts/userRepository";
import NotFoundError from "../errors/notFoundError";
import FailedAuthenticationError from "../errors/failedAuthenticationError";
import JwtService from "../crossCutting/services/jwtService";
import IRepository from "../../domain/seed/repository";
import CriteriaBuilder from "../crossCutting/builders/criteriaBuilder";
import { IUser } from "../../infrastructure/schemas/user/userSchema";

type UserCommand =
    | AuthenticateUser
    | RegisterUser;

class UserCommandHandler
    implements
        ICommandHandler<string, RegisterUser>,
        ICommandHandler<string, AuthenticateUser> {
    private repo: IRepository<User>;

    constructor(
            repo: IRepository<User>,
    ) {
        this.repo = repo;
    }

    solveDependencies = (): void => {
        this.repo = infrastructureContainer.get(INFRA_TOKENS.userRepository);
    };

    handleAsync(command: RegisterUser): Promise<string>;
    handleAsync(command: AuthenticateUser): Promise<string>;

    public async handleAsync(command: UserCommand): Promise<string | SucceededAuth> {
        this.solveDependencies();

        switch (command.concreteType) {
            case "AuthenticateUser": return await this.handleAuthenticateUser(command);
            case "RegisterUser": return await this.handleRegisterUser(command);
        }
    }

    private async handleAuthenticateUser(command: AuthenticateUser): Promise<string> {
        const user = await this.repo.findOneAsync(
            new CriteriaBuilder<IUser>()
                .tryAdd("username", command.username)
                .build()
        );

        if (user == null)
            throw new NotFoundError("User corresponding to email not found.");

        const authenticationResult = user.authenticateAgainst(
            command.username,
            command.password
        );

        switch (authenticationResult.kind)
        {
            case "succeeded": return JwtService.generateToken(authenticationResult);
            case "failed": throw new FailedAuthenticationError("Unable to authenticate.", authenticationResult);
        }
    }

    private async handleRegisterUser(command: RegisterUser): Promise<string> {
        const newUser = User.createNew({
            username: command.username,
            email: command.email,
            password: Password.createNew({ password: command.password }),
        });

        const savedUser = await this.repo.upsertAsync(newUser);

        if (savedUser == null)
            throw new UpsertError("Unable to create user.");

        return savedUser._id;
    }
}

injected(
    UserCommandHandler,
    INFRA_TOKENS.userRepository,
);

export default UserCommandHandler;