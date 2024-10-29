import { IUser, UserModel } from "../schemas/user/userSchema";
import { Document } from "mongoose";
import { UserConfigurationModel } from "../schemas/user/configurationSchema";

import User from "../../domain/aggregates/user/user";
import BaseMongoRepository from "./BaseMongoRepository";
import Password from "../../domain/aggregates/user/password";

class MongoUserRepository extends BaseMongoRepository<IUser, User> {
    public constructor() {
        super(UserModel);
    }

    protected parse = (entity: User): IUser => {
        return {
            _id: entity._id,
            email: entity.email,
            password: entity.password,
            username: entity.username,
            hasKubo: entity.hasKubo,
            configuration: (entity.configuration)
                ? new UserConfigurationModel().fromUserConfiguration(entity.configuration)
                : null,
        };
    };

    protected loadFromDocument = (document: Document<unknown, {}, IUser> & IUser & Required<{ _id: string; }>): User => {
        return User.load(
            document._id,
            {
                email: document.email,
                password: Password.load({ password: document.password }),
                username: document.username,
                hasKubo: document.hasKubo,
                configuration: new UserConfigurationModel(document.configuration).toUserConfiguration(),
            }
        );
    }
}

export default MongoUserRepository;