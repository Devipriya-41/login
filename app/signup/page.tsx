// app/signup/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { signupStart, signupSuccess, signupFailure } from '../store/authSlice'
import Header from '@/components/header'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    dispatch(signupStart())
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful signup
      const user = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
      }
      
      dispatch(signupSuccess(user))
      router.push('/notes')
    } catch (err) {
      dispatch(signupFailure())
      setError('Registration failed')
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="Signup Page" />
      
      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-100 rounded-lg p-8 w-96 max-w-md mx-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-800">Signup</h2>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 text-center mb-4">Sign up</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => router.push('/signin')}
                className="flex-1 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}