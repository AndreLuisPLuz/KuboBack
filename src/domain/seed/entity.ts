import { v4 as uuid } from "uuid";

abstract class Entity<TProps> {
    public readonly _id: string;
    protected props: TProps;

    constructor(props: TProps, id: string | null = null) {
        this._id = id || uuid();
        this.props = props;
    }
}

export default Entity;