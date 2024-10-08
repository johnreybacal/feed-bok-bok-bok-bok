import { NextFunction, Request, Response } from "express";
import { feedbackAdministrationService as service } from "./service";
import { listSchema } from "./validator";

class Controller {
    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = listSchema.validateSync(req.query, { abortEarly: false });
            console.log(params)
            const data = await service.list(params);

            res.status(200).json({
                data
            })
        } catch (err) {
            next(err);
        }
    }
}

export const feedbackAdministrationController = new Controller();