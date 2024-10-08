import bodyParser from "body-parser";
import express from "express";

export const app = express();
const baseUrl = "/api";

app.use(bodyParser.json())