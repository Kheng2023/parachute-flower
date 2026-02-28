import PETALS from "../data/petals";

function WelcomeScreen({ onStart, hasExistingProgress }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-hero">
        <div className="welcome-flower-icon">🌸</div>
        <h1>The Flower Exercise</h1>
        <p className="welcome-subtitle">
          From <em>What Color Is Your Parachute?</em> by Richard N. Bolles
        </p>
      </div>

      <div className="welcome-description">
        <p>
          Discover your ideal career by exploring <strong>7 dimensions</strong>{" "}
          of who you are and what you want. Each "petal" represents one aspect
          of your perfect job.
        </p>
      </div>

      <div className="petal-preview-grid">
        {PETALS.map((petal) => (
          <div
            key={petal.id}
            className="petal-preview-card"
            style={{ borderLeftColor: petal.color }}
          >
            <span className="petal-preview-icon">{petal.icon}</span>
            <div>
              <strong>{petal.name}</strong>
              <p>{petal.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="welcome-info">
        <div className="info-card">
          <span className="info-icon">⏱️</span>
          <div>
            <strong>About 45–60 minutes</strong>
            <p>Your progress is saved automatically</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">🔒</span>
          <div>
            <strong>Private & local</strong>
            <p>All data stays in your browser</p>
          </div>
        </div>
        <div className="info-card">
          <span className="info-icon">🖨️</span>
          <div>
            <strong>Printable flower</strong>
            <p>Get a visual summary you can keep</p>
          </div>
        </div>
      </div>

      <div className="welcome-actions">
        <button className="btn-primary btn-large" onClick={() => onStart(false)}>
          {hasExistingProgress ? "Start Fresh" : "Begin the Exercise"}
        </button>
        {hasExistingProgress && (
          <button
            className="btn-secondary btn-large"
            onClick={() => onStart(true)}
          >
            Continue Where I Left Off
          </button>
        )}
      </div>
    </div>
  );
}

export default WelcomeScreen;
