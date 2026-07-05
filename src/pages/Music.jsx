import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function Music() {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(null);

  const currentAudioRef = useRef(null);

  const [progressMap, setProgressMap] = useState({});
  const [durationMap, setDurationMap] = useState({});
  const [volumeMap, setVolumeMap] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/music/`, {
        withCredentials: true,
      })
      .then((res) => setMusicList(res.data.musics || []))
      .finally(() => setLoading(false));
  }, []);

  const togglePlay = (music) => {
    const audio = document.getElementById(music._id);
    if (!audio) return;

    if (audio.paused) {
      if (currentAudioRef.current && currentAudioRef.current !== audio) {
        currentAudioRef.current.pause();
      }
      audio.play();
      currentAudioRef.current = audio;
      setCurrentId(music._id);
    } else {
      audio.pause();
      setCurrentId(null);
    }
  };

  const handleTimeUpdate = (musicId, e) => {
    const audio = e.target;

    setProgressMap((p) => ({
      ...p,
      [musicId]: audio.currentTime,
    }));

    setDurationMap((p) => ({
      ...p,
      [musicId]: audio.duration || 0,
    }));
  };

  const handleSeek = (musicId, e) => {
    const audio = document.getElementById(musicId);
    audio.currentTime = Number(e.target.value);
  };

  const handleVolume = (musicId, e) => {
    const audio = document.getElementById(musicId);
    audio.volume = Number(e.target.value);
    setVolumeMap((p) => ({ ...p, [musicId]: e.target.value }));
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      <h2 style={styles.header}>🎧 Music Space</h2>

      {loading && <Loading text="Loading sound universe..." />}

      <div style={styles.grid}>
        {musicList.map((music) => {
          const isActive = currentId === music._id;

          const progress = progressMap[music._id] || 0;
          const duration = durationMap[music._id] || 0;
          const volume = volumeMap[music._id] ?? 1;

          return (
            <div
              key={music._id}
              style={{
                ...styles.card,
                transform: isActive
                  ? "scale(1.02)"
                  : "scale(1)",
                boxShadow: isActive
                  ? "0 0 40px rgba(168,85,247,0.35)"
                  : "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              {/* TOP */}
              <div style={styles.top}>
                <div style={styles.avatar}>🎵</div>

                <div style={{ flex: 1 }}>
                  <h3 style={styles.title}>
                    {music.title || "Untitled"}
                  </h3>

                  <p style={styles.artist}>
                    {music.artist?.username || "Unknown Artist"}
                  </p>

                  <div style={styles.status}>
                    {isActive ? (
                      <span style={styles.live}>● Playing</span>
                    ) : (
                      <span style={styles.idle}>Ready</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => togglePlay(music)}
                  style={{
                    ...styles.playBtn,
                    background: isActive
                      ? "linear-gradient(135deg,#22c55e,#16a34a)"
                      : "linear-gradient(135deg,#6366f1,#ec4899)",
                  }}
                >
                  {isActive ? "⏸" : "▶"}
                </button>
              </div>

              {/* AUDIO */}
              <audio
                id={music._id}
                onTimeUpdate={(e) =>
                  handleTimeUpdate(music._id, e)
                }
                onLoadedMetadata={(e) =>
                  setDurationMap((p) => ({
                    ...p,
                    [music._id]: e.target.duration,
                  }))
                }
              >
                <source src={music.uri} type="audio/mpeg" />
              </audio>

              {/* PROGRESS */}
              {isActive && (
                <div style={styles.controls}>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={progress}
                    onChange={(e) => handleSeek(music._id, e)}
                    style={styles.seek}
                  />

                  <div style={styles.time}>
                    <span>{format(progress)}</span>
                    <span>{format(duration)}</span>
                  </div>

                  <div style={styles.volumeRow}>
                    🔊
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) =>
                        handleVolume(music._id, e)
                      }
                      style={styles.volume}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- utils ---------- */

function format(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* ---------- PREMIUM STYLES ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "50px 16px",
    background:
      "radial-gradient(circle at top, #0b1220, #05070f 70%)",
    color: "#fff",
    position: "relative",
  },

  glow: {
    position: "absolute",
    top: "-200px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "700px",
    height: "700px",
    background: "rgba(139,92,246,0.18)",
    filter: "blur(140px)",
    borderRadius: "50%",
    zIndex: -1,
  },

  header: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "30px",
    background: "linear-gradient(90deg,#fff,#a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  card: {
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    transition: "0.3s ease",
  },

  top: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  avatar: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#6366f1,#ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700",
  },

  artist: {
    margin: "3px 0",
    fontSize: "12px",
    color: "#94a3b8",
  },

  status: {
    fontSize: "11px",
  },

  live: {
    color: "#22c55e",
  },

  idle: {
    color: "#64748b",
  },

  playBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  controls: {
    marginTop: "12px",
  },

  seek: {
    width: "100%",
    accentColor: "#a855f7",
  },

  time: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "10px",
    color: "#94a3b8",
  },

  volumeRow: {
    marginTop: "8px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontSize: "12px",
  },

  volume: {
    width: "100%",
    accentColor: "#22c55e",
  },
};

export default Music;