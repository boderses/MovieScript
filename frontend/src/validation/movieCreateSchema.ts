import * as yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const required = "This field is required";

export const movieCreateSchema = yup.object({
  title: yup
    .string()
    .max(250, "Title should be less than 250 characters")
    .required(required),
  description: yup
    .string()
    .max(1000, "Description should be less than 1000 characters")
    .required(required),
  categories: yup.array().of(yup.string()).required(required),
  releaseDate: yup.date().typeError("Invalid date").required(required),
  imagePath: yup
    .mixed()
    .test("fileExist", required, (value) => value[0])
    .test(
      "fileSize",
      "File too large, must be less than 5mb",
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  duration: yup
    .number()
    .transform((currentValue, originalValue) => {
      return originalValue === "" ? null : currentValue;
    })
    .nullable()
    .integer()
    .positive()
    .max(1000, "Duration should be less than 1000")
    .required(required),
  grade: yup.number().required(required),
});
