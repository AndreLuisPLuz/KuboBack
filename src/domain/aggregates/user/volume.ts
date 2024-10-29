import ValueObject from "../../seed/valueObject";

type VolumeProps = {
    currentLevel: number;
};

class Volume extends ValueObject<VolumeProps> {
    private static readonly lowerBound = 0;
    private static readonly upperBound = 100;

    private constructor(props: VolumeProps) {
        super(props);
    }

    public static createNew = ({ currentLevel }: VolumeProps): Volume => {
        currentLevel = this.ensureLevelInBounds(currentLevel);
        return new Volume({ currentLevel });
    };

    private static ensureLevelInBounds = (level: number): number => {
        if (level < this.lowerBound)
            return this.lowerBound;

        if (level > this.upperBound)
            return this.upperBound;

        return level;
    }
}

export default Volume;