import { model, Schema } from "mongoose";

interface ILanguage {
    _id: string;
    name: string;
}

const languageSchema = new Schema<ILanguage>({
    _id: { type: String },
    name: { type: String },
});

const LanguageModel = model<ILanguage>("Language", languageSchema);

export { ILanguage, LanguageModel };