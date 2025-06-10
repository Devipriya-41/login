'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { updateNote, deleteNote } from '@/app/store/notesSlice'
import { Note } from '@/app/store/notesSlice'

interface EditNoteModalProps {
  isOpen: boolean
  onClose: () => void
  note: Note | null
}

export default function EditNoteModal({ isOpen, onClose, note }: EditNoteModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note])

  const handleSave = () => {
    if (title.trim() && content.trim() && note) {
      const updatedNote = {
        ...note,
        title: title.trim(),
        content: content.trim(),
        lastModified: new Date().toISOString(),
      }
      dispatch(updateNote(updatedNote))
      onClose()
    }
  }

  const handleDelete = () => {
    if (note) {
      dispatch(deleteNote(note.id))
      onClose()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCancel = () => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
    onClose()
  }

  if (!note) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-orange-100 rounded-lg p-6 w-96 max-w-md mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Test</h2>
              <button
                onClick={onClose}
                className="text-red-400 hover:text-red-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              
              <div className="flex justify-center space-x-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
