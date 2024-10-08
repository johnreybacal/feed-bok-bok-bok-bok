import { NextFunction, Request, Response } from "express";
import { feedbackSubmissionService as service } from "./service";
import { submitSchema } from "./validator";

class Controller {
    submit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, feedback } = submitSchema.validateSync(req.body, {
                abortEarly: false
            })

            await service.save(name, email, feedback)

            res.status(200).json({
                message: "Feedback submitted"
            })
        } catch (err) {
            next(err);
        }
    }
}

export const feedbackSubmissionController = new Controller();