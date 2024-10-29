import { NextFunction, Request, Response } from "express";
import FailedAuthenticationError from "../../application/errors/failedAuthenticationError";
import NotFoundError from "../../application/errors/notFoundError";
import UpsertError from "../../application/errors/upsertError";
import InvalidHeaderError from "../../application/errors/invalidHeaderError";
import InvalidTokenError from "../../application/errors/invalidTokenError";

const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    switch (err.constructor) {
        case FailedAuthenticationError:
            const e = err as FailedAuthenticationError
            return res.status(400).json(e.result);

        case InvalidHeaderError:
        case InvalidTokenError:
            return res.status(400).json({ message: err.message });
            
        case NotFoundError:
            return res.status(404).json({ message: err.message });
        
        case UpsertError:
            return res.status(500).json({ message: err.message });
        
        default:
            if (process.env.NODE_ENV == "development") {
                console.error(err);
                return res.status(500).json({ message: "Unknown server error", exception: err.message });
            }
        
            return res.status(500).json({ message: "Unknown server error" });
        };

}
export default handleError;