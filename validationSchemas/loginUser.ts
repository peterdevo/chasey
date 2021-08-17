import { object, string, TypeOf } from "yup";

export const loginUserSchema = object({
  email: string().required("Email is required."),
  password: string().required("Password is required."),
});

export type loginUser = TypeOf<typeof loginUserSchema>;
