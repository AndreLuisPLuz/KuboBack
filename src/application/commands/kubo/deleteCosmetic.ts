import ICommand from "../../seed/command";
import { v4 as uuid } from "uuid";

type DeleteCosmeticProperties = {
    id: string,
};

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

export default DeleteCosmetic;