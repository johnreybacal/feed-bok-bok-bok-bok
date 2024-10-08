import { date, object, string } from "yup";

export const listSchema = object().shape({
    category: string(),
    from: date(),
    to: date()
}).noUnknown(true);