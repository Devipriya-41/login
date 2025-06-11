/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signupUser } from "../store/authSlice";
import Header from "@/components/header";
import { AppDispatch } from "../store/store";

// Validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError, setStatus }: any
  ) => {
    try {
      setStatus(null);
      const result = await dispatch(
        signupUser({
          username: values.username,
          email: values.email,
          password: values.password,
        })
      );

      if (result.success) {
        router.push("/signin");
      } else {
        if (result.error?.includes("email")) {
          setFieldError("email", result.error);
        } else if (result.error?.includes("username")) {
          setFieldError("username", result.error);
        } else {
          setStatus(result.error || "Registration failed");
        }
      }
    } catch (err) {
      setStatus("Registration failed");
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="Signup Page" />

      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-100 rounded-lg w-96 max-w-md mx-4 border-1 border-black-100"
        >
          <div className="flex items-center justify-between px-8 py-4 border-b border-black-100">
            <h2 className="text-xl font-medium text-gray-800">Signup</h2>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-4 px-8 py-4">
                <h3 className="text-2xl font-bold text-black-500 text-center mb-4">
                  Sign up
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="w-full px-3 py-2 border border-black-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-black-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border border-black-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full px-3 py-2 border border-black-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {status && <p className="text-red-500 text-sm">{status}</p>}

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-2 bg-teal-200 px-4 py-2 text-black rounded-md hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/signin")}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-orange-300 text-black rounded-md hover:bg-orange-500 transition-colors disabled:opacity-50"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
}
