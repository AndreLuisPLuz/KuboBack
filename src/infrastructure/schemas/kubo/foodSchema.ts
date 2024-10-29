import { model, Model, Schema } from "mongoose";
import Food from "../../../domain/aggregates/kubo/food";

interface IFood {
    foodId: string | null;
    quantity: number;
}

interface IFoodMethods {
    toFood(): Food;
    fromFood(food: Food): IFood;
}

type FoodSchema = Model<IFood, {}, IFoodMethods>;

const foodSchema = new Schema<IFood, FoodSchema, IFoodMethods>({
    foodId: { type: String, required: false },
    quantity: { type: Number, required: true }
});

foodSchema.method("toFood",
    function toFood(): Food {
        return Food.createNew({
            foodId: this.foodId,
            quantity: this.quantity
        });
    }
)

foodSchema.method("fromFood",
    function fromFood(food: Food): IFood {
        this.foodId = food.foodId;
        this.quantity = food.quantity;

        return this;
    }
)

const FoodModel = model("Food", foodSchema);

export {
    IFood,
    foodSchema,
    FoodModel
};