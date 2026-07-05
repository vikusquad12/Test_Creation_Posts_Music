import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const formData = new FormData(e.target);

    const data = {
      identifier: formData.get("identifier").trim(),
      password: formData.get("password").trim(),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );

      console.log("Login success:", res.data);

      // ✅ SAVE TOKEN
      localStorage.setItem("jwtRadheToken", res.data.token);

      alert("Login successful");

      // 🔥 force header update
      window.dispatchEvent(new Event("storage"));

      console.log("before navigate");
      navigate("/posts");
      console.log("after navigate");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      {loading && <Loading text="Logging you in..." />}

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username / Email"
          name="identifier"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "auto",
  },
  input: { margin: "10px 0", padding: "10px" },
  button: {
    padding: "10px",
    background: "blue",
    color: "white",
    border: "none",
  },
};

export default Login;