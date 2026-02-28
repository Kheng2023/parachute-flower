import PETALS from "../data/petals";

function Dashboard({ petalStates, onSelectPetal, onViewFlower }) {
  const completedCount = PETALS.filter(
    (p) => petalStates[p.id]?.status === "completed"
  ).length;
  const allComplete = completedCount === PETALS.length;
  const progress = Math.round((completedCount / PETALS.length) * 100);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🌸 My Flower Exercise</h1>
        <p className="dashboard-subtitle">
          Complete each petal to build your career flower
        </p>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-text">
            {completedCount} of {PETALS.length} petals complete
          </span>
        </div>
      </div>

      <div className="petal-cards-grid">
        {PETALS.map((petal) => {
          const state = petalStates[petal.id];
          const status = state?.status || "not-started";
          const statusLabel =
            status === "completed"
              ? "✅ Completed"
              : status === "in-progress"
              ? "🔄 In Progress"
              : "○ Not Started";

          return (
            <div
              key={petal.id}
              className={`petal-card petal-card-${status}`}
              style={{ "--petal-color": petal.color, "--petal-light": petal.lightColor }}
              onClick={() => onSelectPetal(petal.id)}
            >
              <div className="petal-card-header">
                <span className="petal-card-icon">{petal.icon}</span>
                <span className="petal-card-status">{statusLabel}</span>
              </div>
              <h3>{petal.name}</h3>
              <p className="petal-card-subtitle">{petal.subtitle}</p>
              <p className="petal-card-desc">{petal.description}</p>
              {status === "completed" && state?.rankedResults?.length > 0 && (
                <div className="petal-card-preview">
                  <strong>Top 3:</strong>
                  <ol>
                    {state.rankedResults.slice(0, 3).map((item, i) => (
                      <li key={i}>{item.name}</li>
                    ))}
                  </ol>
                </div>
              )}
              {status === "completed" && state?.type === "input" && (
                <div className="petal-card-preview">
                  <strong>Completed ✓</strong>
                </div>
              )}
              <button
                className="btn-petal"
                style={{ backgroundColor: petal.color }}
              >
                {status === "completed"
                  ? "Review"
                  : status === "in-progress"
                  ? "Continue"
                  : "Start"}
              </button>
            </div>
          );
        })}
      </div>

      {allComplete && (
        <div className="flower-ready-banner">
          <h2>🎉 All petals complete!</h2>
          <p>Your flower is ready to view and print.</p>
          <button className="btn-primary btn-large" onClick={onViewFlower}>
            View My Flower 🌸
          </button>
        </div>
      )}

      {!allComplete && completedCount > 0 && (
        <div className="flower-preview-hint">
          <button className="btn-secondary" onClick={onViewFlower}>
            Preview My Flower (incomplete)
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
