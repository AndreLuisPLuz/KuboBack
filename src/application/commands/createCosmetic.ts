import ICommand from "../seed/command";
import { v4 as uuid } from "uuid";

type CreateCosmeticProps = {
    name: string,
    imagePath: string,
    cosmeticType: "Hat" | "Eyes"
};

class CreateCosmetic implements ICommand<CreateCosmeticProps> {
    commandId: string;
    props: CreateCosmeticProps;
    concreteType: "CreateCosmetic" = "CreateCosmetic";

    public get name() { return this.props.name };
    public get imagePath() { return this.props.imagePath };
    public get type() { return this.props.cosmeticType };

    constructor(props: CreateCosmeticProps) {
        this.commandId = uuid();
        this.props = props;
    }
}

export default CreateCosmetic;