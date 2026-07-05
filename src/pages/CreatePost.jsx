import { useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const file = formData.get("image");

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return; 
    }

    if (file && !file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      e.target.reset();
      return;
    }

    if (loading) return;
    setLoading(true);

    

    try {

      await axios.post(`${import.meta.env.VITE_API_URL}/api/post/create`, formData, { withCredentials: true })
      .then( (res)=>{
        alert("Post created successfully");
        e.target.reset();
      })
    } catch (err) {
      console.log(err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div style={styles.container}>
      <h2>Create Post</h2>

      {loading && <Loading text="Creating post..." />}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          style={styles.input}
          required
        />
        <input
          type="file"
          placeholder="Title"
          name="image"
          accept="image/*"
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Create
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto" },
  input: { margin: "10px 0", padding: "10px" },
  textarea: { margin: "10px 0", padding: "10px", height: "100px" },
  button: { padding: "10px", background: "purple", color: "white", border: "none" },
};

export default CreatePost;