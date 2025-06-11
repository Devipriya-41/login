/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface AuthState {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem("registeredUsers");
  return users ? JSON.parse(users) : [];
};

const storeUsers = (users: User[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  }
};

const getStoredAuth = () => {
  if (typeof window === "undefined") return null;
  const auth = localStorage.getItem("currentUser");
  return auth ? JSON.parse(auth) : null;
};

const storeAuth = (user: Omit<User, "password"> | null) => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const storedUser = getStoredAuth();
      if (storedUser) {
        state.user = storedUser;
        state.isAuthenticated = true;
      }
    },

    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action: PayloadAction<Omit<User, "password">>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      storeAuth(action.payload);
    },

    loginFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      storeAuth(null);
    },

    signupStart: (state) => {
      state.loading = true;
    },

    signupSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      const userWithoutPassword = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
      };
      state.user = userWithoutPassword;
      const users = getStoredUsers();
      users.push(action.payload);
      storeUsers(users);
      storeAuth(userWithoutPassword);
    },

    signupFailure: (state) => {
      state.loading = false;
    },
  },
});

export const loginUser =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(loginStart());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const users = getStoredUsers();
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const userWithoutPassword = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        dispatch(loginSuccess(userWithoutPassword));
        return { success: true };
      } else {
        dispatch(loginFailure());
        return { success: false, error: "Invalid email or password" };
      }
    } catch (error) {
      dispatch(loginFailure());
      return { success: false, error: "Login failed" };
      console.log(error);
    }
  };

export const signupUser =
  (userData: Omit<User, "id">) => async (dispatch: any) => {
    dispatch(signupStart());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const users = getStoredUsers();
      const existingUser = users.find((u) => u.email === userData.email);
      if (existingUser) {
        dispatch(signupFailure());
        return { success: false, error: "User with this email already exists" };
      }

      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
      };

      dispatch(signupSuccess(newUser));
      return { success: true };
    } catch (error) {
      dispatch(signupFailure());
      return { success: false, error: "Registration failed" };
      console.log(error);
    }
  };

export const {
  initializeAuth,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
} = authSlice.actions;

export default authSlice.reducer;
