import { Container, token } from "brandi";
import { applicationContainer } from "../application/container";

import AuthController from "./controllers/authController";
import KuboController from "./controllers/kuboController";

const PRES_TOKENS = {
    authController: token<AuthController>("authController"),
    kuboController: token<KuboController>("kuboController"),
};

const presentationContainer = new Container().extend(applicationContainer);

presentationContainer.bind(PRES_TOKENS.authController)
    .toInstance(AuthController)
    .inSingletonScope();

presentationContainer.bind(PRES_TOKENS.kuboController)
    .toInstance(KuboController)
    .inSingletonScope();

export { PRES_TOKENS, presentationContainer };