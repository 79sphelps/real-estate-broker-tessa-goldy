import loading from "../assets/loading.svg";

const Loading = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Waking up the server hosted on Render.com (free tier)… */}
    <img src={loading} alt="Loading" />
    {/* This can take up to 50 seconds on first load. */}
  </div>
);

export default Loading;
