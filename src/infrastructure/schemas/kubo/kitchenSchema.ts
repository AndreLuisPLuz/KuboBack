import { model, Model, Schema } from "mongoose";
import { FoodModel, foodSchema, IFood } from "./foodSchema";
import Kitchen from "../../../domain/aggregates/kubo/kitchen";

interface IKitchen {
    availableFood: (IFood | null)[];
}

interface IKitchenMethods {
    toKitchen(): Kitchen;
    fromKitchen(kitchen: Kitchen): Kitchen;
}

type KitchenSchema = Model<IKitchen, {}, IKitchenMethods>;

const kitchenSchema = new Schema<IKitchen, KitchenSchema, IKitchenMethods>({
    availableFood: [foodSchema]
});

kitchenSchema.method("toKitchen", 
    function toKitchen(): Kitchen {
        return Kitchen.createNew({
            availableFood: this.availableFood.map(
                f => new FoodModel(f).toFood()
            )
        });
    }
)

kitchenSchema.method("fromKitchen",
    function fromKitchen(kitchen: Kitchen): IKitchen {
        this.availableFood = kitchen.availableFood.map(f => f
            ? new FoodModel().fromFood(f)
            : null
        );

        return this;
    }
)

const KitchenModel = model("Kitchen", kitchenSchema);

export { IKitchen, kitchenSchema, KitchenModel };