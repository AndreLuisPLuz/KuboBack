import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";
import { SucceededAuth } from "../../../domain/aggregates/user/types/authenticationResult";
import InvalidTokenError from "../../errors/invalidTokenError";
import { APP_TOKENS, applicationContainer } from "../../container";

class JwtService {
    public static generateToken = (auth: SucceededAuth): string => {
        const secret = process.env.APP_SECRET_KEY;
        const token = jsonwebtoken.sign(
            { userId: auth.userId },
            secret!,
            { expiresIn: '1 day' }
        );

        return token;
    };

    public static validateToken = (bearer: string): void => {
        const [_prefix, token] = bearer.split(" ");

        if (token === undefined)
            throw new InvalidTokenError("A bearer token should be given.");

        const userContext = applicationContainer.get(APP_TOKENS.userContext);

        jsonwebtoken.verify(token, process.env.APP_SECRET_KEY!,
            (err: any, decoded: any) => {
                if (err)
                    throw new InvalidTokenError("Invalid token.")

                userContext.fill({ userId: decoded.userId });
            }
        )
    };
}

export default JwtService;