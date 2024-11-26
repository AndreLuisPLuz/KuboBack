import Cosmetic from "../../domain/aggregates/cosmetic/cosmetic";
import Kubo from "../../domain/aggregates/kubo/kubo";
import { KuboDetails } from "../queries/kubo/getKuboDetails";

class KuboMapper {
    static toKuboDetails(kubo: Kubo, eyes: Cosmetic, hat: Cosmetic): KuboDetails {
        return {
            data: {
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
            },
            message: "Kubo details found."
        }
    }
}

export default KuboMapper;