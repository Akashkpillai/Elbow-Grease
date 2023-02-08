import * as Yup from 'yup'


export const signupSchema = Yup.object({
    name:Yup.string().min(3).max(20).required("Please Enter Your name"),
    email:Yup.string().email().required("Please enter your email"),
    phone:Yup.string().required("Please enter your valid phone number"),
    city:Yup.string().required("Fill the field"),
    category:Yup.string().required("Please choose a option"),
    address:Yup.string().min(5).max(50).required("Please enter your address"),
    newPassword:Yup.string().min(6).required("Please enter the password"),
    conPassword:Yup.string().required().oneOf([Yup.ref("newPassword"),null],"Password must match")

})