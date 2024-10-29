import { NextFunction, Request, Response } from "express";
import InvalidHeaderError from "../../application/errors/invalidHeaderError";
import JwtService from "../../application/crossCutting/services/jwtService";

const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;

    if (!authToken)
        throw new InvalidHeaderError("Authorization header not present.");

    JwtService.validateToken(authToken);
    next()
};

export default authenticate;