import { object, string } from "yup";

export const submitSchema = object().shape({
    name: string().required(),
    email: string().required().email(),
    feedback: string().required(),
}).noUnknown(true);