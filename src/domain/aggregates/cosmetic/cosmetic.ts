import Entity from "../../seed/entity";
import { CosmeticType } from "./cosmeticType";

type CosmeticProps = {
    name: string;
    imagePath: string;
    type: CosmeticType;
};

class Cosmetic extends Entity<CosmeticProps> {
    public get name() { return this.props.name };
    public get imagePath() { return this.props.imagePath };
    public get type() { return this.props.type };

    private constructor(
            props: CosmeticProps,
            id: string | null = null
    ) {
        super(props, id);
    }

    public static createNew = (props: CosmeticProps): Cosmetic => {
        return new Cosmetic(props);
    };
}

export default Cosmetic;    