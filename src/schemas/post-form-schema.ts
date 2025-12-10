import { object, string } from "yup";

const postFormSchema = object().shape({
  title: string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  body: string()
    .required("Body is required")
    .min(10, "Body must be at least 10 characters")
    .max(500, "Body must be less than 500 characters"),
});

export default postFormSchema;
