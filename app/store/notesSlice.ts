import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  userId: string;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
}

const getNotesFromStorage = (userId: string): Note[] => {
  if (typeof window === "undefined") return [];
  const notesKey = `notes_${userId}`;
  const storedNotes = localStorage.getItem(notesKey);
  return storedNotes ? JSON.parse(storedNotes) : [];
};

const saveNotesToStorage = (userId: string, notes: Note[]) => {
  if (typeof window !== "undefined") {
    const notesKey = `notes_${userId}`;
    localStorage.setItem(notesKey, JSON.stringify(notes));
  }
};

const initialState: NotesState = {
  notes: [],
  loading: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    loadUserNotes: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.notes = getNotesFromStorage(userId);
    },

    clearNotes: (state) => {
      state.notes = [];
    },

    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },

    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      saveNotesToStorage(action.payload.userId, state.notes);
    },

    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
        saveNotesToStorage(action.payload.userId, state.notes);
      }
    },

    deleteNote: (
      state,
      action: PayloadAction<{ noteId: string; userId: string }>
    ) => {
      state.notes = state.notes.filter(
        (note) => note.id !== action.payload.noteId
      );
      saveNotesToStorage(action.payload.userId, state.notes);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  loadUserNotes,
  clearNotes,
  setNotes,
  addNote,
  updateNote,
  deleteNote,
  setLoading,
} = notesSlice.actions;

export default notesSlice.reducer;
