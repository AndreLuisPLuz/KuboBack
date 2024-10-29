import { model, Model, Schema } from "mongoose";
import { ISoundOptions, SoundOptionsModel, soundOptionsSchema } from "./soundOptionsSchema";
import UserConfiguration from "../../../domain/aggregates/user/configuration";

interface IUserConfiguration {
    languageId: string;
    soundOptions: ISoundOptions;
}

interface IUserConfigurationMethods {
    toUserConfiguration(): UserConfiguration;
    fromUserConfiguration(configuration: UserConfiguration): IUserConfiguration;
}

type UserConfigurationSchema = Model<IUserConfiguration, {}, IUserConfigurationMethods>;

const userConfigurationSchema = new Schema<IUserConfiguration, UserConfigurationSchema, IUserConfigurationMethods>({
    languageId: { type: String, required: true },
    soundOptions: soundOptionsSchema
});

userConfigurationSchema.method("toUserConfiguration",
    function toUserConfiguration() {
        return UserConfiguration.createNew({
            languageId: this.languageId,
            soundOptions: new SoundOptionsModel(this.soundOptions).toSoundOptions(),
        })
    }
);

userConfigurationSchema.method("fromUserConfiguration",
    function fromUserConfiguration(configuration: UserConfiguration): IUserConfiguration {
        this.languageId = configuration.languageId,
        this.soundOptions = new SoundOptionsModel()
            .fromSoundOptions(configuration.soundOptions);
        
        return this;
    }
)

const UserConfigurationModel = model("UserConfiguration", userConfigurationSchema);

export { 
    IUserConfiguration,
    userConfigurationSchema,
    UserConfigurationModel
};