import { model, Model, Schema } from "mongoose";
import { CosmeticType, Type } from "../../../domain/aggregates/cosmetic/cosmeticType";
import { match } from "ts-pattern";

interface ICosmeticType {
    type: "Hat" | "Eyes";
}

interface ICosmeticTypeMethods {
    toCosmeticType(): CosmeticType;
}

type CosmeticTypeSchema = Model<ICosmeticType, {}, ICosmeticTypeMethods>;

const cosmeticTypeSchema = new Schema<ICosmeticType, CosmeticTypeSchema, ICosmeticTypeMethods>({
    type: { type: String, required: true }
});

cosmeticTypeSchema.method("toCosmeticType",
    function toCosmeticType(): CosmeticType {
        const type = match(this.type)
            .with("Eyes", () => Type.EYES)
            .with("Hat", () => Type.HAT)
            .exhaustive();

        return CosmeticType.getInstance(type);
    }
);

const CosmeticTypeModel = model("CosmeticType", cosmeticTypeSchema);

export { ICosmeticType, cosmeticTypeSchema, CosmeticTypeModel };