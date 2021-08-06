import {object,string, TypeOf} from "yup"


export const registerUserSchema=object({

    firstName:string().required("Firstname field is required!").min(2),
    lastName:string().required("Lastname is required!").min(2),
    email:string().required("Email is required!").email("The field must be email!"),
    password:string().required("Password is required!").min(6, "Password must be at least 6 characters"),
})

export type registerUser=TypeOf<typeof registerUserSchema>