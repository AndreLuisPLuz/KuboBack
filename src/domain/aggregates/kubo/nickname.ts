import ValueObject from "../../seed/valueObject";

type NicknameProps = {
    value: string
};

class Nickname extends ValueObject<NicknameProps> {
    public get value() { return this.props.value };

    private constructor(props: NicknameProps) {
        super(props);
    }

    public static createNew = (props: NicknameProps): Nickname => {
        return new Nickname(props);
    };
}

export default Nickname;