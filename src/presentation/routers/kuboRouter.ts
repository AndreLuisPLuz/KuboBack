import { Router } from "express";
import { PRES_TOKENS, presentationContainer } from "../container";
import multer from "multer";
import authenticate from "../middlewares/authMiddleware";

const kuboController = presentationContainer.get(PRES_TOKENS.kuboController);7
const upload = multer({ storage: multer.memoryStorage() });

const kuboRouter = Router();
kuboRouter.use(authenticate);
kuboRouter.post("", kuboController.CreateKubo);
kuboRouter.get("/cosmetic", kuboController.FindManyCosmeticOptions);
kuboRouter.post("/cosmetic", upload.single("image"), kuboController.CreateCosmeticOption);
kuboRouter.delete("/cosmetic/:id", kuboController.DeleteCosmeticOption);

export default kuboRouter;