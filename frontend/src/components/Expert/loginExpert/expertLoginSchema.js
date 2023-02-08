import * as Yup from 'yup'


export const loginSchema = Yup.object({
    phone:Yup.string().required("Please enter your phone number"),
    password:Yup.string().required("Please enter your password"),
})