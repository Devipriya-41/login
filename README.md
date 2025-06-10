// README.md
# Keep Notes - Next.js Note Taking Application

A modern, responsive note-taking application built with Next.js 14, TypeScript, Redux Toolkit, and Tailwind CSS.

## Features

1. User Authentication (Sign Up / Sign In)
2. Create, Read, Update, Delete Notes
3. Responsive Design
4. Modern UI with Framer Motion Animations
5. Redux State Management
6. TypeScript for Type Safety
7. Tailwind CSS for Styling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios (ready for API integration)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── NoteCard.tsx
│   ├── AddNoteModal.tsx
│   └── EditNoteModal.tsx
├── store/              # Redux store and slices
│   ├── store.ts
│   ├── authSlice.ts
│   └── notesSlice.ts
├── about/              # About page
├── account/            # Account settings page
├── notes/              # Notes dashboard page
├── signin/             # Sign in page
├── signup/             # Sign up page
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx           # Home page
```

## Features Implementation

### Authentication
- Redux-based authentication state management
- Protected routes with automatic redirects
- Sign up and sign in forms with validation

### Notes Management
- CRUD operations for notes
- Modal-based note creation and editing
- Real-time state updates
- Responsive note grid layout

### UI/UX
- Clean, modern design matching the provided mockups
- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Intuitive user interactions

## API Integration Ready

The application is structured to easily integrate with a backend API:
- Redux slices ready for async thunks
- Axios configured for HTTP requests
- Error handling structures in place

## Deployment

```bash
npm run build
npm start
```

## Development Notes

- Uses Next.js 14 App Router for modern routing
- All components are client-side rendered where needed
- State persists during the session
- Ready for backend integration
- Optimized for performance and SEO 