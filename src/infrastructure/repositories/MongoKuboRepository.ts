import { Document } from "mongoose";
import { IKubo, KuboModel } from "../schemas/kubo/kuboSchema";
import { KuboStatModel } from "../schemas/kubo/kuboStatSchema";
import { KitchenModel } from "../schemas/kubo/kitchenSchema";

import Kubo from "../../domain/aggregates/kubo/kubo";
import BaseMongoRepository from "./BaseMongoRepository";
import Nickname from "../../domain/aggregates/kubo/nickname";

class MongoKuboRepository extends BaseMongoRepository<IKubo, Kubo> {
    public constructor() {
        super(KuboModel);
    }
    
    protected loadFromDocument = (document: Document<unknown, {}, IKubo> & IKubo & Required<{ _id: string; }>): Kubo => {
        const nickname = Nickname.createNew({ value: document.nickname });
        
        return Kubo.load(document._id, {
            userId: document.userId,
            nickname: nickname,
            health: new KuboStatModel(document.health).toKuboStat(),
            hunger: new KuboStatModel(document.hunger).toKuboStat(),
            happiness: new KuboStatModel(document.happiness).toKuboStat(),
            color: document.color,
            eyesId: document.eyesId,
            hatId: document.hatId,
            coins: document.coins,
            kitchen: new KitchenModel(document.kitchen).toKitchen()
        });
    };

    protected parse = (entity: Kubo): IKubo => {
        return {
            _id: entity._id,
            userId: entity.userId,
            nickname: entity.nickname.value,
            health: new KuboStatModel().fromKuboStat(entity.health),
            hunger: new KuboStatModel().fromKuboStat(entity.hunger),
            happiness: new KuboStatModel().fromKuboStat(entity.happiness),
            color: entity.color,
            eyesId: entity.eyesId,
            hatId: entity.hatId,
            coins: entity.coins,
            kitchen: entity.kitchen
        };
    };
}

export default MongoKuboRepository;