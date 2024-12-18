import { injected } from "brandi";
import { APP_TOKENS } from "../../application/container";
import { Request, Response } from "express";

import CosmeticCommandHandler from "../../application/handlers/kubo/cosmeticCommandHandler";
import KuboCommandHandler from "../../application/handlers/kubo/kuboCommandHandler";
import CreateCosmetic from "../../application/commands/kubo/createCosmetic";
import CosmeticQueryHandler from "../../application/handlers/kubo/cosmeticQueryHandler";
import GetManyCosmetics from "../../application/queries/kubo/getManyCosmetics";
import CreateKubo from "../../application/commands/kubo/createKubo";
import DeleteCosmetic from "../../application/commands/kubo/deleteCosmetic";
import MisssingParamError from "../errors/missingParamError";
import GetKuboDetails from "../../application/queries/kubo/getKuboDetails";
import KuboQueryHandler from "../../application/handlers/kubo/kuboQueryHandler";

class KuboController {
    private kuboCommHandler: KuboCommandHandler;
    private kuboQueryHandler: KuboQueryHandler;
    private cosmeticCommHandler: CosmeticCommandHandler;
    private cosmeticQueryHandler: CosmeticQueryHandler;

    public constructor(
            kuboCommandHandler: KuboCommandHandler,
            kuboQueryHandler: KuboQueryHandler,
            cosmeticCommandHandler: CosmeticCommandHandler,
            cosmeticQueryHandler: CosmeticQueryHandler
    ) {
        this.kuboCommHandler = kuboCommandHandler;
        this.kuboQueryHandler = kuboQueryHandler;
        this.cosmeticCommHandler = cosmeticCommandHandler;
        this.cosmeticQueryHandler = cosmeticQueryHandler;
    }

    public CreateKubo = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.kuboCommHandler.handleAsync(
            new CreateKubo(req.body)
        );

        return res.status(201).json(result);
    };

    public FetchKubo = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.kuboQueryHandler.handleAsync(
            new GetKuboDetails()
        );

        return res.status(200).json(result);
    };

    public CreateCosmeticOption = async (req: Request, res: Response): Promise<Response> => {
        if (!req.file)
            return res.status(400).json({ error: "No image file uploaded" });
    
        const image = req.file.buffer;
        const { name, cosmeticType } = req.body;

        const result = await this.cosmeticCommHandler.handleAsync(
            new CreateCosmetic({name, cosmeticType, image})
        );

        return res.status(201).json(result);
    };

    public DeleteCosmeticOption = async (req: Request, res: Response): Promise<Response> => {
        if (!req.params.id)
            throw new MisssingParamError("id");

        await this.cosmeticCommHandler.handleAsync(
            new DeleteCosmetic({ id: req.params.id })
        );

        return res.status(204).json();
    };

    public FindManyCosmeticOptions = async (req: Request, res: Response): Promise<Response> => {
        const cosmetics = await this.cosmeticQueryHandler.handleAsync(
            new GetManyCosmetics({
                page: Number(req.query.page),
                size: Number(req.query.size),
                type: (req.query.type as "Hat" | "Eyes" | undefined),
            })
        );

        return res.status(200).json(cosmetics);
    };
}

injected(
    KuboController,
    APP_TOKENS.kuboCommandHandler,
    APP_TOKENS.KuboQueryHandler,
    APP_TOKENS.cosmeticCommandHandler,
    APP_TOKENS.cosmeticQueryHandler,
);

export default KuboController;