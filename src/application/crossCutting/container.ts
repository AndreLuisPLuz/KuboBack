import { Container, token } from "brandi";
import UserContext from "./contexts/userContext";
import JwtService from "./services/jwtService";
import { infrastructureContainer } from "../../infrastructure/container";

const CROSS_TOKENS = {
    userContext: token<UserContext>("userContext"),
};

const crossCuttingContainer = new Container().extend(infrastructureContainer);

crossCuttingContainer.bind(CROSS_TOKENS.userContext)
    .toInstance(UserContext)
    .inContainerScope();

export { CROSS_TOKENS, crossCuttingContainer };