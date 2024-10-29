import { Container, token } from "brandi";
import { infrastructureContainer } from "../infrastructure/container";

import UserCommandHandler from "./handlers/userCommandHandler";
import UserQueryHandler from "./handlers/userQueryHandler";
import CosmeticCommandHandler from "./handlers/cosmeticCommandHandler";
import KuboCommandHandler from "./handlers/kuboCommandHandler";
import UserContext from "./crossCutting/contexts/userContext";
import CosmeticQueryHandler from "./handlers/cosmeticQueryHandler";

const APP_TOKENS = {
    cosmeticCommandHandler: token<CosmeticCommandHandler>("cosmeticCommandHandler"),
    cosmeticQueryHandler: token<CosmeticQueryHandler>("cosmeticQueryHandler"),
    kuboCommandHandler: token<KuboCommandHandler>("kuboCommandHandler"),
    userCommandHandler: token<UserCommandHandler>("userCommandHandler"),
    userQueryHandler: token<UserQueryHandler>("userQueryHandler"),
    userContext: token<UserContext>("userContext"),
};

const applicationContainer = new Container().extend(infrastructureContainer);

applicationContainer.bind(APP_TOKENS.cosmeticCommandHandler)
    .toInstance(CosmeticCommandHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.cosmeticQueryHandler)
    .toInstance(CosmeticQueryHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.kuboCommandHandler)
    .toInstance(KuboCommandHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.userCommandHandler)
    .toInstance(UserCommandHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.userQueryHandler)
    .toInstance(UserQueryHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.userContext)
    .toInstance(UserContext)
    .inResolutionScope();

export { APP_TOKENS, applicationContainer };