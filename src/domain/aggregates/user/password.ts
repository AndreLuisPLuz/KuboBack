import bcrypt, { compareSync } from "bcryptjs";
import ValueObject from "../../seed/valueObject";

type PasswordProps = {
    password: string;
};

class Password extends ValueObject<PasswordProps> {
    public get value() { return this.props.password };

    private constructor(props: PasswordProps) {
        super(props);
    }

    public static createNew = (props: PasswordProps): Password => {
        const numSaltRounds = process.env.NODE_ENV == "development" ? 1 : 32;

        const salt = bcrypt.genSaltSync(numSaltRounds);
        const hash = bcrypt.hashSync(props.password, salt);

        return new Password({ password: hash });
    };

    public static load = (props: PasswordProps): Password => {
        return new Password(props);
    };

    public matchesAgainst = (rawPassword: string): boolean => {
        return compareSync(rawPassword, this.props.password);
    };
}

export default Password;