type CosmeticDto = {
    id: string;
    name: string;
    imagePath: string;
    type: "Hat" | "Eyes";
};

type KuboDto = {
    id: string;
    nickname: string;
    color: string;
    health: number;
    hunger: number;
    happiness: number;
    hat: CosmeticDto;
    eyes: CosmeticDto;
}

export type {
    CosmeticDto,
    KuboDto,
};