// app/about/page.tsx
'use client'
import Header from '@/components/header'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="About" />
      
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">About Keep Notes</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <p className="text-gray-600">
              Keep Notes is a simple and elegant note-taking application built with modern web technologies.
            </p>
            
            <h2 className="text-xl font-medium text-gray-800">Features</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Create, edit, and delete notes</li>
              <li>User authentication and management</li>
              <li>Responsive design for all devices</li>
              <li>Real-time updates</li>
              <li>Clean and intuitive interface</li>
            </ul>
            
            <h2 className="text-xl font-medium text-gray-800">Technology Stack</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Next.js 14 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Redux Toolkit for state management</li>
              <li>Tailwind CSS for styling</li>
              <li>Framer Motion for animations</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
