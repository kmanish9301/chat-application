const yup = require("yup");

const createUserValidationSchema = yup.object().shape({
    user_name: yup.string().required("Username is required."),
    email: yup.string().email("Invalid Email").required("Email is required."),
    password: yup.string().required("Password is required."),
    role: yup.string().oneOf(["admin", "user"], "Invalid role").default("user"),
});

module.exports = {createUserValidationSchema};