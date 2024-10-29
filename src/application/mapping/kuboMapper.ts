import Cosmetic from "../../domain/aggregates/cosmetic/cosmetic";
import Kubo from "../../domain/aggregates/kubo/kubo";

class KuboMapper {
    static toKuboDetails(kubo: Kubo, eyes: Cosmetic, hat: Cosmetic) {
        return {
            id: kubo._id,
            nickname: kubo.nickname.value,
            color: kubo.color,
            health: kubo.health.level,
            hunger: kubo.hunger.level,
            happiness: kubo.happiness.level,
            hat: {
                id: kubo.hatId,
                name: hat.name,
                imagePath: hat.name,
                type: hat.type.type,
            },
            eyes: {
                id: kubo.eyesId,
                name: eyes.name,
                imagePath: eyes.name,
                type: eyes.type.type,
            },
        }
    }
}

export default KuboMapper;