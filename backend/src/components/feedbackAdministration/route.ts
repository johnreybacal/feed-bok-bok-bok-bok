import { Router } from "express";
import { feedbackAdministrationController as controller } from "./controller";

export const feedbackAdministrationRouter = Router();
const baseUrl = "/feedbacks"

feedbackAdministrationRouter.get(`${baseUrl}`, controller.list)
