import iconError from "../assets/images/icon-error.svg";
import iconRetry from "../assets/images/icon-retry.svg";

export default function ErrorSection({ error, setRefreshKey }) {
  return (
    <div className="error">
      <img src={iconError} alt="icon-error" />
      <h1>Somthing went wrong</h1>
      <p>{error}</p>
      <button onClick={() => setRefreshKey((s) => s + 1)}>
        <img src={iconRetry} alt="retry-icon" />
        Retry
      </button>
    </div>
  );
}
