// app/store/notesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Note {
  id: string
  title: string
  content: string
  lastModified: string
  userId: string
}

interface NotesState {
  notes: Note[]
  loading: boolean
}

const initialState: NotesState = {
  notes: [],
  loading: false,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload)
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id)
      if (index !== -1) {
        state.notes[index] = action.payload
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setNotes, addNote, updateNote, deleteNote, setLoading } = notesSlice.actions
export default notesSlice.reducer