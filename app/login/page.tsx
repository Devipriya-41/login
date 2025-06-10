// app/login/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      router.push('/')
    }
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">Keep Notes</div>
            <nav className="nav-links">
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/" className="nav-link">Notes</Link>
              <Link href="/account" className="nav-link">Account</Link>
              <Link href="/login" className="nav-link">Login</Link>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Homepage</Link> / Login Page
        </div>
      </div>

      <main className="main-content">
        <div className="login-container">
          <div className="login-header">
            Login
            <div className="window-controls">
              <div className="window-control red"></div>
              <div className="window-control yellow"></div>
              <div className="window-control green"></div>
            </div>
          </div>
          
          <h1 className="login-title">Login</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <Link href="/register">
                <button type="button" className="btn btn-secondary">Register</button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
