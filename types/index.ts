// types/index.ts
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface NotesState {
  notes: Note[];
  loading: boolean;
}