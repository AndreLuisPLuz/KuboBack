import { model, Schema } from "mongoose";
import { ICosmetic } from "../cosmetic/cosmeticSchema";
import { IKitchen, kitchenSchema } from "./kitchenSchema";
import { IKuboStat, kuboStatSchema } from "./kuboStatSchema";

interface IKubo {
    _id: string,
    nickname: string,
    userId: string,
    health: IKuboStat,
    hunger: IKuboStat,
    happiness: IKuboStat,
    color: string,
    hatId: string,
    eyesId: string,
    coins: number,
    kitchen: IKitchen,
    lastSession: Date,
}

const kuboSchema = new Schema<IKubo>({
    _id: { type: String },
    userId: { type: String, ref: "User" },
    nickname: { type: String, required: true },
    health: kuboStatSchema,
    hunger: kuboStatSchema,
    happiness: kuboStatSchema,
    color: { type: String, required: true },
    hatId: { type: String, ref: "Cosmetic", required: true },
    eyesId: { type: String, ref: "Cosmetic", required: true },
    coins: { type: Number, required: true },
    lastSession: { type: Date, required: true },
    kitchen: kitchenSchema
});

const KuboModel = model<IKubo>("Kubo", kuboSchema);

export { IKubo, KuboModel };