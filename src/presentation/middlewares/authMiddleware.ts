import { NextFunction, Request, Response } from "express";
import InvalidHeaderError from "../../application/errors/invalidHeaderError";
import { APP_TOKENS, applicationContainer } from "../../application/container";

const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken)
        throw new InvalidHeaderError("Authorization header not present.");

    var jwtService = applicationContainer.get(APP_TOKENS.jwtService);

    jwtService.validateToken(authToken);
    next()
};

export default authenticate;