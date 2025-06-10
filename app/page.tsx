// app/page.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'

export default function HomePage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/notes')
    } else {
      router.push('/signin')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Keep Notes</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}