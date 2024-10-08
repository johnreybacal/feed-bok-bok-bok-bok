import { NextFunction, Request, Response } from "express";
import { kafkaProducer } from "../../config/kafka";
import { feedbackSubmissionService as service } from "./service";
import { submitSchema } from "./validator";

class Controller {
    submit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, feedback } = submitSchema.validateSync(req.body, {
                abortEarly: false
            })

            const { id } = await service.save(name, email, feedback)

            kafkaProducer.send({
                topic: 'feedback-submitted',
                messages: [
                    {
                        key: id,
                        value: feedback
                    },
                ],
            })

            res.status(200).json({
                message: "Feedback submitted"
            })
        } catch (err) {
            next(err);
        }
    }
}

export const feedbackSubmissionController = new Controller();