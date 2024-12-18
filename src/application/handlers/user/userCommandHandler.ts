import "dotenv/config";

import { injected } from "brandi";
import { INFRA_TOKENS, infrastructureContainer } from "../../../infrastructure/container";
import { IUser } from "../../../infrastructure/schemas/user/userSchema";

import User from "../../../domain/aggregates/user/user";
import ICommandHandler from "../../seed/commandHandler";
import RegisterUser, { RegisterUserResult } from "../../commands/user/registerUser"; 
import AuthenticateUser, { AuthenticateUserResult } from "../../commands/user/authenticateUser";
import UpsertError from "../../errors/upsertError";
import Password from "../../../domain/aggregates/user/password";
import NotFoundError from "../../errors/notFoundError";
import FailedAuthenticationError from "../../errors/failedAuthenticationError";
import JwtService from "../../crossCutting/services/jwtService";
import IRepository from "../../../domain/seed/repository";
import CriteriaBuilder from "../../crossCutting/builders/criteriaBuilder";
import InvalidCommandError from "../../errors/invalidCommandError";

type UserCommand =
    | AuthenticateUser
    | RegisterUser;

class UserCommandHandler
    implements
        ICommandHandler<RegisterUserResult, RegisterUser>,
        ICommandHandler<AuthenticateUserResult, AuthenticateUser> {
    private repo: IRepository<User>;

    constructor(
            repo: IRepository<User>,
    ) {
        this.repo = repo;
    }

    solveDependencies = (): void => {
        this.repo = infrastructureContainer.get(INFRA_TOKENS.userRepository);
    };

    handleAsync(command: RegisterUser): Promise<RegisterUserResult>;
    handleAsync(command: AuthenticateUser): Promise<AuthenticateUserResult>;

    public async handleAsync(command: UserCommand): Promise<RegisterUserResult | AuthenticateUserResult> {
        this.solveDependencies();

        switch (command.concreteType) {
            case "AuthenticateUser": return await this.handleAuthenticateUser(command);
            case "RegisterUser": return await this.handleRegisterUser(command);
            default: throw new InvalidCommandError(`Non-existing command.`);
        }
    }

    private async handleAuthenticateUser(command: AuthenticateUser): Promise<AuthenticateUserResult> {
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
            case "succeeded":
                return {
                    data: { token: JwtService.generateToken(authenticationResult) },
                    message: "Authenticated with success."
                };
            case "failed": throw new FailedAuthenticationError("Unable to authenticate.", authenticationResult);
        }
    }

    private async handleRegisterUser(command: RegisterUser): Promise<RegisterUserResult> {
        const newUser = User.createNew({
            username: command.username,
            email: command.email,
            password: Password.createNew({ password: command.password }),
        });

        const savedUser = await this.repo.upsertAsync(newUser);

        if (savedUser == null)
            throw new UpsertError("Unable to create user.");

        return {
            data: { id: savedUser._id },
            message: "User saved with success."
        };
    }
}

injected(
    UserCommandHandler,
    INFRA_TOKENS.userRepository,
);

export default UserCommandHandler;