import { match } from "ts-pattern";
import ValueObject from "../../seed/valueObject";

enum Type {
    HAT = "Hat",
    EYES = "Eyes"
}

type CosmeticTypeProps = {
    id: number;
    description: "Hat" | "Eyes";
    type: Type;
};

class CosmeticType extends ValueObject<CosmeticTypeProps>
{
    public get type() { return this.props.description }

    private static readonly hatCosmetic: CosmeticType = new CosmeticType({
        id: 1, description: "Hat", type: Type.HAT
    });
    private static readonly eyesCosmetic: CosmeticType = new CosmeticType({
        id: 2, description: "Eyes", type: Type.EYES
    });

    private constructor(props: CosmeticTypeProps) {
        super(props);
    }

    public static getInstance = (type: Type): CosmeticType => {
        return match(type)
            .with(Type.EYES, () => this.eyesCosmetic)
            .with(Type.HAT, () => this.hatCosmetic)
            .otherwise(() => { throw new Error("Non-existant type."); })
    }
}

export { Type, CosmeticType }