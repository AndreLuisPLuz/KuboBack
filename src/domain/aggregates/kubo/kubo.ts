import Entity from "../../seed/entity";
import Cosmetic from "../cosmetic/cosmetic";
import StatFactory from "./factories/statFactory";
import Kitchen from "./kitchen";
import KuboStat from "./kuboStat";
import Nickname from "./nickname";

type KuboProps = {
    userId: string;
    nickname: Nickname;
    color: string;
    health: KuboStat;
    hunger: KuboStat;
    happiness: KuboStat;
    coins: number;
    hatId: string;
    eyesId: string;
    kitchen: Kitchen;
    lastSession: Date;
};

type KuboCreateProps = Omit<KuboProps,
    "health" | "hunger" | "happiness" | "coins" | "kitchen">;

class Kubo extends Entity<KuboProps> {
    public get userId() { return this.props.userId };
    public get nickname() { return this.props.nickname };
    public get color() { return this.props.color };
    public get health() { return this.props.health };
    public get hunger() { return this.props.hunger };
    public get happiness() { return this.props.happiness };
    public get coins() { return this.props.coins };
    public get hatId() { return this.props.hatId };
    public get eyesId() { return this.props.eyesId };
    public get kitchen() { return this.props.kitchen };
    public get lastSession() { return this.props.lastSession };

    private constructor(
            props: KuboProps,
            id: string | null = null
    ) {
        super(props, id)
    }

    public static createNew = (props: KuboCreateProps): Kubo => {
        return new Kubo({
            ...props,
            health: StatFactory.createHealth(100),
            hunger: StatFactory.createHunger(100),
            happiness: StatFactory.createHappiness(100),
            coins: 100,
            kitchen: Kitchen.createNew({ availableFood: [] }),
            lastSession: new Date(),
        });
    };

    public static load = (id: string, props: KuboProps): Kubo => {
        return new Kubo(props, id);
    };

    public openNewSession = () => {
        const millisPassed = this.lastSession.getTime() - new Date().getTime();
        const minutesPassed = Math.floor(millisPassed / 60_000);

        this.props.health = KuboStat.updateOnNewSession(this.health, minutesPassed);
        this.props.hunger = KuboStat.updateOnNewSession(this.hunger, minutesPassed);
        this.props.happiness = KuboStat.updateOnNewSession(this.happiness, minutesPassed);

        this.props.lastSession = new Date();
    }
}

export default Kubo;