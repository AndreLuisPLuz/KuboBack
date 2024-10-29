import { shallowEqual } from "shallow-equal-object";

abstract class ValueObject<TProps> {
    public readonly props: TProps;

    protected constructor (props: TProps) {
        this.props = Object.freeze(props);
    }

    public equals = (object?: ValueObject<TProps>) : boolean => {
        if (object == null || object === undefined)
            return false;

        if (object.props === undefined)
            return false;

        return shallowEqual(this.props, object.props);
    }
}

export default ValueObject;