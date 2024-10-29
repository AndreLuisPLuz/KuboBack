import { Container, token } from "brandi";
import IRepository from "../domain/seed/repository";
import Kubo from "../domain/aggregates/kubo/kubo";
import Language from "../domain/aggregates/translation/language";
import MongoKuboRepository from "./repositories/MongoKuboRepository";
import MongoUserRepository from "./repositories/MongoUserRepository";
import MongoTranslationRepository from "./repositories/MongoTranslationRepository";
import Cosmetic from "../domain/aggregates/cosmetic/cosmetic";
import MongoCosmeticRepository from "./repositories/MongoCosmeticRepository";
import User from "../domain/aggregates/user/user";

const INFRA_TOKENS = {
    kuboRepository: token<IRepository<Kubo>>("kuboRepository"),
    userRepository: token<IRepository<User>>("userRepository"),
    translationRepository: token<IRepository<Language>>("translationRepository"),
    cosmeticRepository: token<IRepository<Cosmetic>>("cosmeticRepository"),
};

const infrastructureContainer = new Container();

infrastructureContainer.bind(INFRA_TOKENS.kuboRepository)
    .toInstance(() => new MongoKuboRepository())
    .inTransientScope();

infrastructureContainer.bind(INFRA_TOKENS.userRepository)
    .toInstance(() => new MongoUserRepository())
    .inTransientScope();

infrastructureContainer.bind(INFRA_TOKENS.translationRepository)
    .toInstance(() => new MongoTranslationRepository())
    .inTransientScope();

infrastructureContainer.bind(INFRA_TOKENS.cosmeticRepository)
    .toInstance(() => new MongoCosmeticRepository())
    .inTransientScope();

export { INFRA_TOKENS, infrastructureContainer };