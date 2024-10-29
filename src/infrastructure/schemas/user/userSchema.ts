import { model, Schema } from "mongoose";
import { IUserConfiguration, userConfigurationSchema } from "./configurationSchema";

interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    hasKubo: boolean;
    configuration: IUserConfiguration | null;
}

const userSchema = new Schema<IUser>({
    _id: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hasKubo: { type: Boolean, required: true },
    configuration: userConfigurationSchema
});

const UserModel = model<IUser>("User", userSchema);

export { IUser, UserModel };