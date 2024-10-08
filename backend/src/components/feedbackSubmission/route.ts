import { Router } from "express";
import { feedbackSubmissionController as controller } from "./controller";

export const feedbackSubmissionRouter = Router();
const baseUrl = "/feedbacks"

feedbackSubmissionRouter.post(`${baseUrl}/submit`, controller.submit)
