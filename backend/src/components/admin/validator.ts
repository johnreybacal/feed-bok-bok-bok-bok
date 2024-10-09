import { number, object, string } from "yup";

export const listSchema = object().shape({
    category: string(),
    from: string(),
    to: string(),
    page: number().default(1),
    pageSize: number().default(10)
}).noUnknown(true);