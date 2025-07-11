# Netflix Clone Full-Stack Application

This project is a full-stack Netflix clone, featuring a React frontend and a Node.js/Express backend. It allows users to browse, search, and watch movies and TV shows, with authentication and personalized features.

## Features

### Frontend (React + Vite)

- Modern UI inspired by Netflix
- User authentication (Sign Up, Login)
- Browse trending movies and TV shows
- Search for content
- Watch page for streaming
- User history and personalized content
- Responsive design

### Backend (Node.js + Express)

- RESTful API for movies, TV shows, and user management
- JWT-based authentication
- MongoDB integration for user data
- TMDB API integration for content data
- Secure routes and middleware

## Project Structure

```
backend/
  server.js                # Entry point for Express server
  config/                  # Database and environment config
  controllers/             # Route controllers (auth, movie, tv, search)
  middleware/              # Auth middleware
  models/                  # Mongoose models
  routes/                  # API route definitions
  services/                # TMDB API service
  utils/                   # Utility functions
frontend/
  src/                     # React source code
    components/            # Reusable UI components
    hooks/                 # Custom React hooks
    pages/                 # App pages (Home, Login, Signup, etc.)
    store/                 # State management
    utils/                 # Frontend utilities
  public/                  # Static assets
  index.html               # Main HTML file
  vite.config.js           # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- TMDB API key

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in `backend/config/` with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TMDB_API_KEY=your_tmdb_api_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

- **Backend**: Set in `backend/config/.env`
- **Frontend**: If needed, create `.env` in `frontend/` for Vite environment variables

## Scripts

- **Backend**
  - `npm start` — Start the Express server
- **Frontend**
  - `npm run dev` — Start Vite dev server
  - `npm run build` — Build for production

## License

This project is for educational purposes only and is not affiliated with Netflix.
