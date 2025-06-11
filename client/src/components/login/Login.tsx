import axios from "axios";
import { ErrorMessage, Field, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginApiUrl } from "../../store/ApiEndpoints";
import { apiUrl } from "../../store/_urls";
import { setUserDetails } from "../../store/userSlice";
import { isAuthenticated } from "../../utils/_utils";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state: any) => state.user);

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const loginFormik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      const payload = {
        email: value.email,
        password: value.password,
      };

      try {
        const { status, data: body } = await axios.post(
          `${apiUrl}${loginApiUrl}`,
          payload
        );

        if (status >= 400 && status <= 599) {
          console.error("Login failed with status:", status);
          return;
        }

        if (status === 200) {
          dispatch(setUserDetails(body.user_details || body));
          localStorage.setItem("accessToken", body.user_details.access_token);
          loginFormik.resetForm();
          navigate("/");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <FormikProvider value={loginFormik}>
          <div className="space-y-4">
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
              onClick={() => loginFormik.handleSubmit()}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Log In
            </button>
          </div>
        </FormikProvider>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
