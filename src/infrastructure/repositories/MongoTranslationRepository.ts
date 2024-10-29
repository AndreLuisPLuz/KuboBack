import { ILanguage, LanguageModel } from "../schemas/translation/languageSchema";
import { Document, HydratedDocument } from "mongoose";

import Language from "../../domain/aggregates/translation/language";
import BaseMongoRepository from "./BaseMongoRepository";

class MongoTranslationRepository extends BaseMongoRepository<ILanguage, Language> {
    public constructor() {
        super(LanguageModel);
    }
    
    protected override loadFromDocument = (document: HydratedDocument<ILanguage>): Language => {
        return Language.load(
            { name: document.name },
            document._id
        );
    };

    protected parse = (entity: Language): Document<unknown, {}, ILanguage> & ILanguage & Required<{ _id: string; }> => {
        throw new Error();
    };
}

export default MongoTranslationRepository;