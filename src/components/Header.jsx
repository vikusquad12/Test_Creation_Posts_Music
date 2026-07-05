import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("jwtRadheToken")
  );

  useEffect(() => {
    const updateToken = () => {
      setToken(localStorage.getItem("jwtRadheToken"));
    };

    window.addEventListener("storage", updateToken);
    return () => window.removeEventListener("storage", updateToken);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      // clear auth
      localStorage.removeItem("jwtRadheToken");
      setToken(null);

      window.dispatchEvent(new Event("storage"));

      // 🚀 FORCE REDIRECT
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Logout failed");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MusicHub</Link>
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/posts">See Posts</Link></li>
          <li><Link to="/music">Listen Music</Link></li>

          {token ? (
            <>
              <li><Link to="/create-post">Create Post</Link></li>
              <li><Link to="/create-music">Create Music</Link></li>

              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;