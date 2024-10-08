import { Router } from "express";
import { feedbackAdministrationController as controller } from "./controller";

export const feedbackAdministrationRouter = Router();
const baseUrl = "/feedback"

feedbackAdministrationRouter.get(`${baseUrl}`, controller.list)
