'use client'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/app/store/store'
import { logout } from '@/app/store/authSlice'

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage = 'Notes' }: HeaderProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.push('/signin')
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <header className="bg-teal-300 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">Keep Notes</h1>
          <div className="text-sm text-gray-600">
            <span>Homepage</span>
            {currentPage && (
              <>
                <span className="mx-1">/</span>
                <span>{currentPage}</span>
              </>
            )}
          </div>
        </div>
        <nav className="flex space-x-6">
          <button 
            onClick={() => handleNavigation('/about')}
            className="text-gray-700 hover:text-gray-900"
          >
            About
          </button>
          <button 
            onClick={() => handleNavigation('/notes')}
            className="text-gray-700 hover:text-gray-900"
          >
            Notes
          </button>
          <button 
            onClick={() => handleNavigation('/account')}
            className="text-gray-700 hover:text-gray-900"
          >
            Account
          </button>
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => handleNavigation('/signin')}
              className="text-gray-700 hover:text-gray-900"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}