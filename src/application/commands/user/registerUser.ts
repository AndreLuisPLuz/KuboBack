import ICommand from "../../seed/command";
import { v4 as uuid } from "uuid";
import { OutResponse } from "../../seed/responses";

type RegisterUserProps = {
    username: string;
    email: string;
    password: string;
};

type RegisterUserResult = OutResponse<{ id: string }>;

class RegisterUser implements ICommand<RegisterUserProps>
{
    commandId: string;
    props: RegisterUserProps;
    concreteType: "RegisterUser" = "RegisterUser";

    public get username() { return this.props.username };
    public get email() { return this.props.email };
    public get password() { return this.props.password };

    public constructor(props: RegisterUserProps) {
        this.commandId = uuid();
        this.props = props;
    }
}

export type { RegisterUserResult };
export default RegisterUser;