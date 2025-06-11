'use client'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RootState } from '../store/store'
import { initializeAuth, logout } from '../store/authSlice'
import { loadUserNotes, clearNotes } from '../store/notesSlice'
import Header from '@/components/header'

export default function AccountPage() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { notes } = useSelector((state: RootState) => state.notes)
  const [authInitialized, setAuthInitialized] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(initializeAuth())
    setAuthInitialized(true)
  }, [dispatch])

  useEffect(() => {
    if (authInitialized && !isAuthenticated) {
      router.push('/signin')
      return
    }
  }, [authInitialized, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(loadUserNotes(user.id))
    }
  }, [isAuthenticated, user?.id, dispatch])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearNotes())
    router.push('/signin')
  }
  if (!authInitialized || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="Account" />
      
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Account Settings</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Profile Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <p className="text-gray-900">{user.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">User ID</label>
                  <p className="text-gray-500 text-sm">{user.id}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">{notes.length}</p>
                  <p className="text-sm text-gray-600">Total Notes</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">
                    {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">Current Date</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}