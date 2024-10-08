import { Router } from "express";
import { feedbackSubmissionController as controller } from "./controller";

export const feedbackSubmissionRouter = Router();
const baseUrl = "/feedback"

feedbackSubmissionRouter.post(`${baseUrl}/submit`, controller.submit)
