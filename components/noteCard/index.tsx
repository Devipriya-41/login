"use client";
import { motion } from "framer-motion";
import { Note } from "@/app/store/notesSlice";

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onDelete?: (id: string) => void;
}

export default function NoteCard({ note, onClick, onDelete }: NoteCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(note.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="bg-orange-200 px-3 py-2 border-b border-orange-300 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 text-sm truncate flex-1 mr-2">
          {note.title || "Untitled"}
        </h3>
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-colors"
          aria-label="Delete note"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Content area */}
      <div className="bg-white p-3">
        <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-4 min-h-[60px]">
          {note.content || "No content..."}
        </p>

        {/* Last modified date */}
        <p className="text-xs text-gray-500 text-right border-t border-gray-100 pt-2">
          Last Modified:{" "}
          {new Date(note.lastModified).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  );
}
