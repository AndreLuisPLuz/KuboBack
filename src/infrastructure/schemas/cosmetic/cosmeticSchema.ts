import { model, Schema } from "mongoose";
import { cosmeticTypeSchema, ICosmeticType } from "./cosmeticTypeSchema";
import { string } from "ts-pattern/dist/patterns";

interface ICosmetic  {
    _id: string;
    name: string;
    imagePath: string;
    type: ICosmeticType;
}

const cosmeticSchema = new Schema<ICosmetic>({
    _id: { type: String },
    name: { type: String },
    imagePath: { type: String },
    type: cosmeticTypeSchema
});

const CosmeticModel = model("Cosmetic", cosmeticSchema);

export { ICosmetic, CosmeticModel };