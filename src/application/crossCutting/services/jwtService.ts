import "dotenv/config";
import jsonwebtoken from "jsonwebtoken";
import { SucceededAuth } from "../../../domain/aggregates/user/types/authenticationResult";
import InvalidTokenError from "../../errors/invalidTokenError";
import UserContext from "../contexts/userContext";
import { injected } from "brandi";
import { CROSS_TOKENS, crossCuttingContainer } from "../container";

class JwtService {
    private userContext: UserContext;

    public constructor(userContext: UserContext) {
        this.userContext = userContext;
    }

    private solveDependencies() : void {
        this.userContext = crossCuttingContainer.get(CROSS_TOKENS.userContext);
    }

    public static generateToken = (auth: SucceededAuth): string => {
        const secret = process.env.APP_SECRET_KEY;
        const token = jsonwebtoken.sign(
            { userId: auth.userId },
            secret!,
            { expiresIn: '1 day' }
        );

        return token;
    };

    public validateToken = (bearer: string): void => {
        const [_prefix, token] = bearer.split(" ");

        if (token === undefined)
            throw new InvalidTokenError("A bearer token should be given.");

        this.solveDependencies();

        jsonwebtoken.verify(token, process.env.APP_SECRET_KEY!,
            (err: any, decoded: any) => {
                if (err)
                    throw new InvalidTokenError("Invalid token.")
                
                this.userContext.fill(decoded.userId);
            }
        )
    };
}

injected(JwtService, CROSS_TOKENS.userContext);

export default JwtService;