import { Router } from "express";
import { adminController as controller } from "./controller";

export const adminRouter = Router();
const baseUrl = "/admin"

adminRouter.get(`${baseUrl}/feedbacks`, controller.list)
