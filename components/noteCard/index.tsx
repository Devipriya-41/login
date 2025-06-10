'use client'
import { motion } from 'framer-motion'
import { Note } from '@/app/store/notesSlice'

interface NoteCardProps {
  note: Note
  onClick: () => void
}

export default function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-orange-100 border border-orange-200 rounded-lg p-4 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800 truncate">{note.title}</h3>
        <button className="text-red-400 hover:text-red-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{note.content}</p>
      <p className="text-xs text-gray-500">
        Last Modified: {new Date(note.lastModified).toLocaleDateString()}
      </p>
    </motion.div>
  )
}