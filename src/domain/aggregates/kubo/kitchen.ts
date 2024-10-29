import ValueObject from "../../seed/valueObject";
import Food from "./food";

type KitchenProps = {
    availableFood: (Food | null)[]
};

class Kitchen extends ValueObject<KitchenProps> {
    public get availableFood() { return this.props.availableFood };

    private constructor(props: KitchenProps) {
        super(props);
    }

    public static createNew(props: KitchenProps): Kitchen {
        return new Kitchen(props);
    }
}

export default Kitchen;