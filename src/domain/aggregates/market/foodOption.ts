import Entity from "../../seed/entity";

type FoodOptionProps = {
    name: string;
    description: string;
    cost: number;
};

class FoodOption extends Entity<FoodOptionProps> {
    private constructor(
            props: FoodOptionProps,
            id: string | null = null
    ) {
        super(props, id);
    }

    public static createNew = (props: FoodOptionProps): FoodOption => {
        return new FoodOption(props);
    };
}

export default FoodOption;