import { injected } from "brandi";
import { APP_TOKENS } from "../../application/container";
import { Request, Response } from "express";

import CosmeticCommandHandler from "../../application/handlers/kubo/cosmeticCommandHandler";
import KuboCommandHandler from "../../application/handlers/kubo/kuboCommandHandler";
import CreateCosmetic from "../../application/commands/kubo/createCosmetic";
import CosmeticQueryHandler from "../../application/handlers/kubo/cosmeticQueryHandler";
import GetManyCosmetics from "../../application/queries/kubo/getManyCosmetics";
import CreateKubo from "../../application/commands/kubo/createKubo";

class KuboController {
    private kuboCommHandler: KuboCommandHandler;
    private cosmeticCommHandler: CosmeticCommandHandler;
    private cosmeticQueryHandler: CosmeticQueryHandler;

    public constructor(
            kuboCommandHandler: KuboCommandHandler,
            cosmeticCommandHandler: CosmeticCommandHandler,
            cosmeticQueryHandler: CosmeticQueryHandler
    ) {
        this.kuboCommHandler = kuboCommandHandler;
        this.cosmeticCommHandler = cosmeticCommandHandler;
        this.cosmeticQueryHandler = cosmeticQueryHandler;
    }

    public CreateKubo = async (req: Request, res: Response): Promise<Response> => {
        const kuboId = await this.kuboCommHandler.handleAsync(
            new CreateKubo(req.body)
        );

        return res.status(204).json({ id: kuboId });
    };

    public CreateCosmeticOption = async (req: Request, res: Response): Promise<Response> => {
        const cosmeticId = await this.cosmeticCommHandler.handleAsync(
            new CreateCosmetic(req.body)
        );

        return res.status(201).json({ id: cosmeticId });
    };

    public FindManyCosmeticOptions = async (req: Request, res: Response): Promise<Response> => {
        const cosmetics = await this.cosmeticQueryHandler.handleAsync(
            new GetManyCosmetics({
                page: Number(req.query.page),
                size: Number(req.query.size),
                type: req.body.type || undefined,
            })
        );

        return res.status(200).json(cosmetics);
    };
}

injected(
    KuboController,
    APP_TOKENS.kuboCommandHandler, 
    APP_TOKENS.cosmeticCommandHandler,
    APP_TOKENS.cosmeticQueryHandler,
);

export default KuboController;