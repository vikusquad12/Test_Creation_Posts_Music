import { useState } from "react"; 
import Loading from "../components/Loading";
import axios from "axios";

function CreateMusic() {
  
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return; 
    }

    if (loading) return;
    setLoading(true);

    try {

      const formData = new FormData(e.target);
      const file = formData.get("music");

      if (file && !file.type.startsWith("audio/")) {
        alert("Only audio files are allowed.");
        e.target.reset();
        setLoading(false);
        return;
      }

      await axios.post(
        "http://localhost:3000/api/music/create",
        formData,
        {
          withCredentials: true, // ✅ cookie sent automatically
        }
      );

      alert("Music added successfully");

    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to add music only artist can create music");
    } finally {
        setLoading(false);
    }

  };

  return (
    <div style={styles.container}>
      <h2>Create Music</h2>

      {loading && <Loading text="Uploading music..." />}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          required
          placeholder="Song Title"
          name="title"
          style={styles.input}
          required
        />

        <input
          type="file"
          required
          name="music"
          style={styles.input}
          required
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Uploading..." : "Add Music"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto" },
  input: { margin: "10px 0", padding: "10px" },
  button: { padding: "10px", background: "orange", color: "white", border: "none" },
};

export default CreateMusic;