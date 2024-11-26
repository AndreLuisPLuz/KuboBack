import { Request, Response } from "express";
import { injected } from "brandi";
import { APP_TOKENS } from "../../application/container";

import UserCommandHandler from "../../application/handlers/user/userCommandHandler";
import UserQueryHandler from "../../application/handlers/user/userQueryHandler";

import RegisterUser from "../../application/commands/user/registerUser";
import AuthenticateUser from "../../application/commands/user/authenticateUser";
import GetUserDetails from "../../application/queries/user/getUserDetails";

class AuthController {
    private userCommandHandler: UserCommandHandler;
    private userQueryHandler: UserQueryHandler;

    constructor(
            userCommandHandler: UserCommandHandler,
            userQueryHandler: UserQueryHandler
    ) {
        this.userCommandHandler = userCommandHandler;
        this.userQueryHandler = userQueryHandler;
    }

    registerUser = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.userCommandHandler.handleAsync(
            new RegisterUser(req.body)
        );

        return res.status(201).json(result);
    };

    authenticateUser = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.userCommandHandler.handleAsync(
            new AuthenticateUser(req.body)
        );

        return res.status(200).json(result);
    };

    fetchUserById = async (req: Request, res: Response): Promise<Response> => {
        const userDetails = await this.userQueryHandler.handleAsync(
            new GetUserDetails({ id: req.params.id })
        );

        return res.status(200).json(userDetails);
    };
}

injected(AuthController, APP_TOKENS.userCommandHandler, APP_TOKENS.userQueryHandler);

export default AuthController;