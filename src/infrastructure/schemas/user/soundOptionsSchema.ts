import { model, Model, Schema } from "mongoose";
import SoundOptions from "../../../domain/aggregates/user/soundOptions";
import Volume from "../../../domain/aggregates/user/volume";

interface ISoundOptions  {
    status: "on" | "off";
    musicVolume: number;
    effectsVolume: number;
}

interface ISoundOptionsMethods {
    toSoundOptions(): SoundOptions;
    fromSoundOptions(options: SoundOptions): ISoundOptions;
}

type SoundOptionsSchema = Model<ISoundOptions, {}, ISoundOptionsMethods>;

const soundOptionsSchema = new Schema<ISoundOptions, SoundOptionsSchema, ISoundOptionsMethods>({
    status: { type: String, required: true },
    musicVolume: { type: Number, required: true },
    effectsVolume: { type: Number, required: true },
});

soundOptionsSchema.method("toSoundOptions",
    function toSoundOptions(): SoundOptions {
        return SoundOptions.createNew({
            effectsVolume: Volume.createNew({ currentLevel: this.effectsVolume }),
            musicVolume: Volume.createNew({ currentLevel: this.musicVolume }),
        });
    }
);

soundOptionsSchema.method("fromSoundOptions",
    function fromSoundOptions(options: SoundOptions): ISoundOptions {
        this.status = options.status;
        this.musicVolume = options.musicVolume.props.currentLevel;
        this.effectsVolume = options.effectsVolume.props.currentLevel;

        return this;
    }
)

const SoundOptionsModel = model("SoundOptions", soundOptionsSchema)

export { ISoundOptions, soundOptionsSchema, SoundOptionsModel };