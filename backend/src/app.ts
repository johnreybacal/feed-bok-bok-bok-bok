import bodyParser from "body-parser";
import express from "express";
import { adminRouter } from "./components/admin/route";
import { feedbackSubmissionRouter } from "./components/feedbackSubmission/route";
import { handleError } from "./middlewares/handleError";

export const app = express();
const baseUrl = "/api";

app.use(bodyParser.json())

app.use(baseUrl, feedbackSubmissionRouter);
app.use(baseUrl, adminRouter);

app.use(handleError)