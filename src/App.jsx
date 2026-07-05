import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";

import CreatePost from "./pages/CreatePost";
import GetPosts from "./pages/GetPosts";

import CreateMusic from "./pages/CreateMusic";
import Music from "./pages/Music";

// simple auth check
const isAuth = () => {
  return localStorage.getItem("jwtRadheToken") !== null;
};

// protected route wrapper
function ProtectedRoute({ children }) {
  return isAuth() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/posts" />} />

        {/* Protected routes (require login) */}
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <GetPosts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/music"
          element={
            <ProtectedRoute>
              <Music />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-music"
          element={
            <ProtectedRoute>
              <CreateMusic />
            </ProtectedRoute>
          }
        />

        {/* fallback route */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;