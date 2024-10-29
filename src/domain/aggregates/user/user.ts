import "dotenv/config";
import Entity from "../../seed/entity";
import UserConfiguration from "./configuration";
import Password from "./password";
import { AuthenticationResult } from "./types/authenticationResult";

type UserProps = {
    username: string;
    email: string;
    password: Password;
    hasKubo: boolean;
    configuration?: UserConfiguration;
};

class User extends Entity<UserProps> {
    public get username() { return this.props.username };
    public get email() { return this.props.email };
    public get password() { return this.props.password.value };
    public get hasKubo() { return this.props.hasKubo };
    public get configuration() { return this.props.configuration };

    public set password(value: string) { this.props.password = Password.load({ password: value }) };

    private constructor (
            props: UserProps,
            id: string | null = null,
    ) {
        super(props, id);
    }

    public static createNew = (props: Omit<UserProps, "hasKubo">): User => {
        return new User({ ...props, hasKubo: false} );
    };

    public static load = (id: string, props: UserProps): User => {
        return new User(props, id);
    };

    public authenticateAgainst = (username: string, password: string): AuthenticationResult => {
        const usernameMatches = (this.username == username);
        const passwordMatches = (this.props.password.matchesAgainst(password));

        if (usernameMatches && passwordMatches)
            return { kind: "succeeded", userId: this._id };

        let reasons = [];

        if (!usernameMatches)
            reasons.push("Usernames don't match.");

        if (!passwordMatches)
            reasons.push("Passwords don't match.");

        return {
            kind: "failed",
            reasons: reasons
        };
    };
}

export default User;