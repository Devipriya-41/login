// app/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFailure: (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    signupStart: (state) => {
      state.loading = true
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    signupFailure: (state) => {
      state.loading = false
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
} = authSlice.actions

export default authSlice.reducer
