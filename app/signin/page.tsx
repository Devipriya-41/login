// app/signin/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice'
import Header from '@/components/header'

export default function SignInPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }

    dispatch(loginStart())
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      const user = {
        id: '1',
        username,
        email: `${username}@example.com`,
      }
      
      dispatch(loginSuccess(user))
      router.push('/notes')
    } catch (err) {
      dispatch(loginFailure())
      setError('Invalid credentials')
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="Sign In" />
      
      <div className="flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-100 rounded-lg p-8 w-96 max-w-md mx-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-800">Sign In</h2>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Sign In
              </button>
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="flex-1 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}