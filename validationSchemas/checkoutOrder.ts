import { object, string, array, TypeOf } from "yup";

export const checkoutOrderSchema = object({
  personalInfo: object({
    name: string().required("Name field is required!"),
    email: string().required("Email field is required!").email("The field must be email!"),
    phone: string().required("Phone field is required!"),
    address: object({
      city: string().required("City field is required!"),
      street: string().required("Street field is required!"),
      zipCode: string().required("Zipcode field is required!"),
    }),
  }),

  userId: string(),

  products: array(),
});

export type checkoutOrder = TypeOf<typeof checkoutOrderSchema>;
