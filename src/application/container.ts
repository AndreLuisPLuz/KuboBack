import { Container, token } from "brandi";
import { crossCuttingContainer } from "./crossCutting/container";

import UserCommandHandler from "./handlers/user/userCommandHandler";
import UserQueryHandler from "./handlers/user/userQueryHandler";
import CosmeticCommandHandler from "./handlers/kubo/cosmeticCommandHandler";
import KuboCommandHandler from "./handlers/kubo/kuboCommandHandler";
import CosmeticQueryHandler from "./handlers/kubo/cosmeticQueryHandler";
import KuboQueryHandler from "./handlers/kubo/kuboQueryHandler";
import JwtService from "./crossCutting/services/jwtService";

const APP_TOKENS = {
    jwtService: token<JwtService>("jwtService"),
    cosmeticCommandHandler: token<CosmeticCommandHandler>("cosmeticCommandHandler"),
    cosmeticQueryHandler: token<CosmeticQueryHandler>("cosmeticQueryHandler"),
    kuboCommandHandler: token<KuboCommandHandler>("kuboCommandHandler"),
    KuboQueryHandler: token<KuboQueryHandler>("kuboQueryHandler"),
    userCommandHandler: token<UserCommandHandler>("userCommandHandler"),
    userQueryHandler: token<UserQueryHandler>("userQueryHandler"),
};

const applicationContainer = new Container().extend(crossCuttingContainer);

applicationContainer.bind(APP_TOKENS.jwtService)
    .toInstance(JwtService)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.cosmeticCommandHandler)
    .toInstance(CosmeticCommandHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.cosmeticQueryHandler)
    .toInstance(CosmeticQueryHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.kuboCommandHandler)
    .toInstance(KuboCommandHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.KuboQueryHandler)
    .toInstance(KuboQueryHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.userCommandHandler)
    .toInstance(UserCommandHandler)
    .inSingletonScope();

applicationContainer.bind(APP_TOKENS.userQueryHandler)
    .toInstance(UserQueryHandler)
    .inSingletonScope();

export { APP_TOKENS, applicationContainer };