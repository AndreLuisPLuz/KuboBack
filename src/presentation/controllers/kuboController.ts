import { injected } from "brandi";
import { APP_TOKENS } from "../../application/container";
import { Request, Response } from "express";

import CosmeticCommandHandler from "../../application/handlers/cosmeticCommandHandler";
import KuboCommandHandler from "../../application/handlers/kuboCommandHandler";
import CreateCosmetic from "../../application/commands/createCosmetic";
import CosmeticQueryHandler from "../../application/handlers/cosmeticQueryHandler";
import GetManyCosmetics from "../../application/queries/getManyCosmetics";

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