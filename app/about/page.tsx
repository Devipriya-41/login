"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RootState } from "../store/store";
import { initializeAuth } from "../store/authSlice";
import Header from "@/components/header";

export default function AboutPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [authInitialized, setAuthInitialized] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(initializeAuth());
    setAuthInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (authInitialized && !isAuthenticated) {
      router.push("/signin");
      return;
    }
  }, [authInitialized, isAuthenticated, router]);
  if (!authInitialized || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="About" />

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            About Keep Notes
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <p className="text-gray-600">
              Keep Notes is a simple and elegant note-taking application built
              with modern web technologies.
            </p>

            <h2 className="text-xl font-medium text-gray-800">Features</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Create, edit, and delete notes</li>
              <li>User authentication and management</li>
              <li>User-specific note storage</li>
              <li>Responsive design for all devices</li>
              <li>Real-time updates</li>
              <li>Clean and intuitive interface</li>
              <li>Secure data persistence</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
