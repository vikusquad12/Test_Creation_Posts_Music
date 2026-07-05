import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.target);

    let role = formData.get("role")?.trim().toLowerCase();
    if (role !== "artist") role = "user";

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      role,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, data);
      alert("Registered successfully");
      e.target.reset();
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      {loading && <Loading text="Creating your account..." />}

      <form onSubmit={handleRegister} style={styles.form}>
        <input name="username" placeholder="Name" style={styles.input} disabled={loading} />
        <input name="email" placeholder="Email" style={styles.input} disabled={loading} />
        <input name="password" placeholder="Password" style={styles.input} disabled={loading} />
        <input name="role" placeholder="Role" style={styles.input} disabled={loading} />

        <button disabled={loading} style={styles.button}>
          {loading ? "Please wait..." : "Register"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto" },
  input: { margin: "10px 0", padding: "10px" },
  button: { padding: "10px", background: "green", color: "white", border: "none" },
};

export default Register;