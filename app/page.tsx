// app/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const addNote = () => {
    const title = prompt('Enter note title:')
    const content = prompt('Enter note content:')
    
    if (title && content) {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date()
      }
      setNotes([...notes, newNote])
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  if (!isLoggedIn) {
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
            
            <form onSubmit={(e) => {
              e.preventDefault()
              setIsLoggedIn(true)
            }}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="Email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Password"
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
              <button 
                onClick={() => setIsLoggedIn(false)} 
                className="nav-link" 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Homepage</Link> / Notes
        </div>
        
        <main>
          <h1 style={{ margin: '20px 0', fontSize: '24px', color: '#333' }}>
            My Notes
          </h1>
          
          {notes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', margin: '40px 0' }}>
              No notes yet. Click the + button to create your first note!
            </p>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <div key={note.id} className="note-card">
                  <h3 className="note-title">{note.title}</h3>
                  <p className="note-content">{note.content}</p>
                  <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => {
                        const newTitle = prompt('Edit title:', note.title)
                        const newContent = prompt('Edit content:', note.content)
                        if (newTitle && newContent) {
                          setNotes(notes.map(n => 
                            n.id === note.id 
                              ? { ...n, title: newTitle, content: newContent }
                              : n
                          ))
                        }
                      }}
                      className="btn btn-secondary"
                      style={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="btn btn-primary"
                      style={{ fontSize: '12px', padding: '4px 8px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <button onClick={addNote} className="add-note-btn">
        +
      </button>
    </div>
  )
}
