import ICommand from "../../seed/command";
import { v4 as uuid } from "uuid";
import { OutResponse } from "../../seed/responses";

type CreateCosmeticProps = {
    name: string,
    image: Buffer,
    cosmeticType: "Hat" | "Eyes"
};

type CreateCosmeticResult = OutResponse<{ id: string }>;

class CreateCosmetic implements ICommand<CreateCosmeticProps> {
    commandId: string;
    props: CreateCosmeticProps;
    concreteType: "CreateCosmetic" = "CreateCosmetic";

    public get name() { return this.props.name };
    public get image() { return this.props.image };
    public get type() { return this.props.cosmeticType };

    constructor(props: CreateCosmeticProps) {
        this.commandId = uuid();
        this.props = props;
    }
}

export type { CreateCosmeticResult };
export default CreateCosmetic;