import {
    NextFunction,
    Request,
    Response
} from "express";
import { ValidationError } from "yup";

export function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
        res.status(400).json(err.errors)
    } else {
        console.error(err);
        res.status(500).send("Internal server error")
    }
}