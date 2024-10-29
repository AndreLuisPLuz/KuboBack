import ValueObject from "../../seed/valueObject";
import SoundOptions from "./soundOptions";

type UserConfigurationProps = {
    languageId: string;
    soundOptions: SoundOptions;
};

class UserConfiguration extends ValueObject<UserConfigurationProps> {
    public get languageId() { return this.props.languageId };
    public get soundOptions() { return this.props.soundOptions };

    private constructor(props: UserConfigurationProps) {
        super(props);
    }

    public static createNew = (props: UserConfigurationProps): UserConfiguration => {
        // TODO: language validation
        return new UserConfiguration(props);
    };
}

export default UserConfiguration;