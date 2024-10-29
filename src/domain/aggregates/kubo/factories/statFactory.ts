import KuboStat from "../kuboStat";

class StatFactory {
    public static createHealth = (value: number): KuboStat => {
        return KuboStat.createNew({ currentLevel: value, description: "Health" });
    }

    public static createHunger = (value: number): KuboStat => {
        return KuboStat.createNew({ currentLevel: value, description: "Hunger" });
    }

    public static createHappiness = (value: number): KuboStat => {
        return KuboStat.createNew({ currentLevel: value, description: "Happiness" });
    }
}

export default StatFactory;