// app/about/page.tsx
import Link from 'next/link'

export default function AboutPage() {
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
          <Link href="/">Homepage</Link> / About
        </div>
        
        <main style={{ padding: '40px 0' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
            About Keep Notes
          </h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
            Keep Notes is a simple and intuitive note-taking application built with Next.js and TypeScript. 
            Create, edit, and organize your notes with ease.
          </p>
        </main>
      </div>
    </div>
  )
}
