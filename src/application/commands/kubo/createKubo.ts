import ICommand from "../../seed/command";
import { v4 as uuid } from "uuid";
import { OutResponse } from "../../seed/responses";

type CreateKuboProperties = {
    userId: string;
    nickname: string;
    color: string;
    hatId: string;
    eyesId: string;
};

type CreateKuboResult = OutResponse<{ id: string }>;

class CreateKubo implements ICommand<CreateKuboProperties> {
    commandId: string;
    props: CreateKuboProperties;
    concreteType: "CreateKubo" = "CreateKubo";

    public get userId() { return this.props.userId };
    public get nickname() { return this.props.nickname };
    public get color() { return this.props.color };
    public get hatId() { return this.props.hatId };
    public get eyesId() { return this.props.eyesId };

    constructor(props: CreateKuboProperties) {
        this.commandId = uuid();
        this.props = props;
    }
}

export type { CreateKuboResult };
export default CreateKubo;