function Loading({ text = "Processing..." }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <p>{text}</p>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    zIndex: 9999,
  },

  spinner: {
    width: "45px",
    height: "45px",
    border: "4px solid white",
    borderTop: "4px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "10px",
  },
};

export default Loading;