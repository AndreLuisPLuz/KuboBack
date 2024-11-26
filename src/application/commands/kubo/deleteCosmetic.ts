import ICommand from "../../seed/command";
import { v4 as uuid } from "uuid";
import { OutResponse } from "../../seed/responses";

type DeleteCosmeticProperties = {
    id: string,
};

type DeleteCosmeticResult = void;

class DeleteCosmetic implements ICommand<DeleteCosmeticProperties> {
    commandId: string;
    props: DeleteCosmeticProperties;
    concreteType: "DeleteCosmetic" = "DeleteCosmetic";

    public get id() { return this.props.id };

    constructor(props: DeleteCosmeticProperties) {
        this.commandId = uuid();
        this.props = props;
    }
}

export type { DeleteCosmeticResult };
export default DeleteCosmetic;