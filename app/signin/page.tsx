
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import Header from "@/components/header";

export default function SignInPage() {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    dispatch(loginStart());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = {
        id: "1",
        username: email.split("@")[0],
        email: `${email}`,
      };

      dispatch(loginSuccess(user));
      router.push("/notes");
    } catch (err) {
      dispatch(loginFailure());
      setError("Invalid credentials");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="Sign In" />

      <div className="flex items-center justify-center py-36 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-100 rounded-lg w-96 max-w-md mx-4 border-1 border-black-100 shadow-md"
        >
          <div className="flex items-center justify-between bg-orange-200  px-8 py-2 border-b border-black-100 ">
            <h2 className="text-xl font-medium text-gray-800">Login</h2>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-8">
            <div>
              {" "}
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Login{" "}
              </h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-black-300  bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-black-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-orange-300 text-black rounded-md hover:bg-orange-500 transition-colors"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="flex-1 py-2 bg-teal-200 px-4 py-2 text-black rounded-md hover:bg-teal-400 transition-colors"
              >
                Register
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
