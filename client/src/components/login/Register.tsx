import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { roles } from "../../utils/_utils";
import axios from "axios";
import { apiUrl } from "../../store/_urls";
import { registerApiUrl } from "../../store/ApiEndpoints";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    user_name: "",
    email: "",
    role: "",
    password: "",
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string()
      .oneOf(["admin", "user"], "Invalid role")
      .required("Role is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const registerFormik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async () => {
      const payload = {
        user_name: registerFormik.values.user_name,
        email: registerFormik.values.email,
        role: registerFormik.values.role,
        password: registerFormik.values.password,
      };
      try {
        const { status, data: body } = await axios.post(
          `${apiUrl}${registerApiUrl}`,
          payload
        );

        if (status >= 400 && status <= 599) {
          console.error(status);
          return;
        }

        if (status === 200) {
          registerFormik.resetForm();
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <FormikProvider value={registerFormik}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="user_name"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <Field
                name="user_name"
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="user_name"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Role
              </label>
              <Field
                as="select"
                name="role"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Select Role</option>
                {roles.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <button
              type="submit"
              onClick={() => registerFormik.handleSubmit()}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
          </div>
        </FormikProvider>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
