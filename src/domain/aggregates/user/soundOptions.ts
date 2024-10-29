import ValueObject from "../../seed/valueObject";
import Volume from "./volume";

type SoundOptionsProps = {
    status: "on" | "off";
    musicVolume: Volume;
    effectsVolume: Volume;
};

class SoundOptions extends ValueObject<SoundOptionsProps> {
    public get status() { return this.props.status }
    public get musicVolume() { return this.props.musicVolume };
    public get effectsVolume() { return this.props.effectsVolume };

    private constructor(props: SoundOptionsProps) {
        super(props);
    }

    public static createNew = (props: Omit<SoundOptionsProps, "status">): SoundOptions => {
        return new SoundOptions({
            status: "on",
            ...props
        });
    };
}

export default SoundOptions;