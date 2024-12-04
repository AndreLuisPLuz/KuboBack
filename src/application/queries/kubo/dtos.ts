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
    hat: Omit<CosmeticDto, "name" | "type">;
    eyes: Omit<CosmeticDto, "name" | "type">;
}

export type {
    CosmeticDto,
    KuboDto,
};