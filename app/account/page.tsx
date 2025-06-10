// app/account/page.tsx
import Link from 'next/link'

export default function AccountPage() {
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
          <Link href="/">Homepage</Link> / Account
        </div>
        
        <main style={{ padding: '40px 0' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
            Account Settings
          </h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
            Manage your account settings and preferences here.
          </p>
        </main>
      </div>
    </div>
  )
}
