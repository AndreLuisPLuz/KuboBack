import { Document, Types } from "mongoose";
import Cosmetic from "../../domain/aggregates/cosmetic/cosmetic";
import { CosmeticModel, ICosmetic } from "../schemas/cosmetic/cosmeticSchema";
import BaseMongoRepository from "./BaseMongoRepository";
import { CosmeticType, Type } from "../../domain/aggregates/cosmetic/cosmeticType";

class MongoCosmeticRepository extends BaseMongoRepository<ICosmetic, Cosmetic> {
    constructor() {
        super(CosmeticModel);
    }
    
    protected parse = (entity: Cosmetic): ICosmetic => {
        return {
            _id: entity._id,
            name: entity.name,
            imagePath: entity.imagePath,
            type: {
                type: entity.type.type,
            }
        };
    };

    protected loadFromDocument = (document: Document<unknown, {}, ICosmetic> & ICosmetic & Required<{ _id: string; }>): Cosmetic => {
        return Cosmetic.createNew({
            name: document.name,
            imagePath: document.imagePath,
            type: CosmeticType.getInstance(document.type.type as Type),
        });
    }
}

export default MongoCosmeticRepository;