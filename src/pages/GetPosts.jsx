import { useEffect, useState } from "react";
import axios from "axios";

function GetPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/post/`, {
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data.posts);
      });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.bgGlow}></div>

      <h2 style={styles.heading}>🎭 Creator Feed</h2>

      <div style={styles.grid}>
        {posts.length > 0 ? (
          posts.map((post) => {
            const isArtist = post.creator?.role === "artist";

            return (
              <div
                key={post._id}
                style={{
                  ...(isArtist ? styles.card_artist : styles.card),
                }}
              >
                {isArtist && <div style={styles.badge}>ARTIST</div>}

                <div style={styles.imageWrap}>
                  <img src={post.uri} alt="post" style={styles.img} />
                </div>

                <div style={styles.content}>
                  <h3
                    style={
                      isArtist ? styles.title_artist : styles.title
                    }
                  >
                    {post.title}
                  </h3>

                  <p style={styles.meta}>
                    {isArtist
                      ? "Verified Creator ✨"
                      : "Community Post"}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p style={styles.empty}>No posts found</p>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "50px 20px",
    background:
      "radial-gradient(circle at top, #0b1220, #05070f 70%)",
    position: "relative",
    color: "#fff",
  },

  bgGlow: {
    position: "absolute",
    top: "-200px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "700px",
    height: "700px",
    background: "rgba(139,92,246,0.18)",
    filter: "blur(140px)",
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  },

  heading: {
    textAlign: "center",
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "40px",
    letterSpacing: "1px",
    background: "linear-gradient(90deg,#fff,#a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    maxWidth: "1100px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },

  /* NORMAL CARD */
  card: {
    borderRadius: "22px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.45)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  /* ARTIST CARD */
  card_artist: {
    borderRadius: "22px",
    overflow: "hidden",
    position: "relative",
    background:
      "linear-gradient(145deg, rgba(25,25,25,0.95), rgba(10,10,10,0.98))",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    boxShadow: "0 15px 60px rgba(255, 215, 0, 0.12)",
    backdropFilter: "blur(25px)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  badge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    padding: "6px 12px",
    fontSize: "10px",
    fontWeight: "700",
    borderRadius: "999px",
    background: "linear-gradient(135deg,#ffd700,#ffb300)",
    color: "#000",
    zIndex: 2,
  },

  imageWrap: {
    width: "100%",
    height: "260px",
    overflow: "hidden",
    background: "#0a0a0a",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },

  content: {
    padding: "16px 18px 20px",
    textAlign: "left",
  },

  title: {
    fontSize: "16px",
    fontWeight: "600",
    margin: 0,
    color: "#e5e7eb",
  },

  title_artist: {
    fontSize: "17px",
    fontWeight: "800",
    margin: 0,
    color: "#ffd700",
    textShadow: "0 0 10px rgba(255,215,0,0.2)",
  },

  meta: {
    marginTop: "6px",
    fontSize: "12px",
    color: "rgba(255,255,255,0.55)",
  },

  empty: {
    textAlign: "center",
    color: "#aaa",
  },
};

export default GetPosts;