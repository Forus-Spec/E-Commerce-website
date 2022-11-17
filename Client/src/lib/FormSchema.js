import * as Yup from "yup";

const schemaFactory = (shape) =>
  Yup.object().shape(shape);

export const loginSchema = schemaFactory({
  username: Yup.string()
    .required("Please enter your username")
    .min(5, "has to be at least 5 characters"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "has to be at least 6 characters"),
});

export const passwordResetSchema = schemaFactory({
  email: Yup.string()
    .required("Please enter your Email"),
});
export const signUpSchema = schemaFactory({
  firstName: Yup.string()
    .required("First name Required")
    .min(5, "has to be at least 5 characters"),
  lastName: Yup.string()
    .required("Last name Required")
    .min(5, "has to be at least 5 characters"),
  email: Yup.string()
    .required("Required")
    .email("Invalid email"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "has to be at least 8 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
