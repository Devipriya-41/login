"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RootState } from "../store/store";
import { initializeAuth } from "../store/authSlice";
import { loadUserNotes, clearNotes, Note } from "../store/notesSlice";
import Header from "@/components/header";
import NoteCard from "@/components/noteCard";
import AddNoteModal from "@/components/addNoteModal";
import EditNoteModal from "@/components/editNoteModal";

export default function NotesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { notes } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(initializeAuth());
    setAuthInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (authInitialized && !isAuthenticated) {
      router.push("/signin");
      return;
    }
  }, [authInitialized, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      dispatch(loadUserNotes(user.id));
    } else if (!isAuthenticated) {
      dispatch(clearNotes());
    }
  }, [isAuthenticated, user?.id, dispatch]);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleAddNote = () => {
    setShowAddModal(true);
  };

  if (!authInitialized || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header currentPage="Your Notes" />

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">
            Good Morning {user?.email ? user.email.split("@")[0] : "User"}
          </h1>

          {notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                No notes yet. Create your first note!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onClick={() => handleNoteClick(note)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddNote}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-400 hover:bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </motion.button>

      <AddNoteModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <EditNoteModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        note={selectedNote}
      />
    </div>
  );
}