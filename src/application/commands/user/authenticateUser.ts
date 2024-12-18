import ICommand from "../../seed/command";
import { v4 as uuid } from "uuid";
import { OutResponse } from "../../seed/responses";

type AuthenticateUserProps = {
    username: string;
    password: string;
};

type AuthenticateUserResult = OutResponse<{ token: string }>

class AuthenticateUser implements ICommand<AuthenticateUserProps> {
    commandId: string;
    props: AuthenticateUserProps;
    concreteType: "AuthenticateUser" = "AuthenticateUser";

    public get username() { return this.props.username };
    public get password() { return this.props.password };

    public constructor(props: AuthenticateUserProps) {
        this.commandId = uuid();
        this.props = props;
    }
}

export type { AuthenticateUserResult };
export default AuthenticateUser;