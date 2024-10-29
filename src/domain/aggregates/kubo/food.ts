import ValueObject from "../../seed/valueObject";

type FoodProps = {
    foodId: string | null;
    quantity: number;
};

class Food extends ValueObject<FoodProps> {
    public get foodId() { return this.props.foodId };
    public get quantity() { return this.props.quantity };

    private constructor(props: FoodProps) {
        super(props);
    }

    public static createNew = (props: FoodProps): Food => {
        return new Food(props);
    };
}

export default Food;