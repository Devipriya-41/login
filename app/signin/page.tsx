/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../store/authSlice";
import Header from "@/components/header";
import { AppDispatch } from "../store/store";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface FormValues {
  email: string;
  password: string;
}

export default function SignInPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      setStatus(null);
      const result = await dispatch(loginUser(values.email, values.password));

      if (result.success) {
        router.push("/notes");
      } else {
        setStatus(result.error || "Login failed");
      }
    } catch (err) {
      setStatus("Login failed");
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="Sign In" />

      <div className="flex items-center justify-center py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-100 rounded-lg w-96 max-w-md mx-4 border-1 border-black-100 shadow-md"
        >
          <div className="flex items-center justify-between bg-orange-200 px-8 py-2 border-b border-black-100">
            <h2 className="text-xl font-medium text-gray-800">Login</h2>
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
              <Form className="space-y-4 p-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Login
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-black-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
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
                    placeholder="Password"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {status && <p className="text-red-500 text-sm">{status}</p>}

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-orange-300 text-black rounded-md hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    disabled={isSubmitting}
                    className="flex-1 py-2 bg-teal-200 px-4 py-2 text-black rounded-md hover:bg-teal-400 transition-colors disabled:opacity-50"
                  >
                    Register
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
