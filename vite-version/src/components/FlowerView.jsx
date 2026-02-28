import PETALS from "../data/petals";
import FlowerDiagram from "./FlowerDiagram";

function FlowerView({ petalStates, onBack, onReset }) {
  const completedCount = PETALS.filter(
    (p) => petalStates[p.id]?.status === "completed"
  ).length;
  const allComplete = completedCount === PETALS.length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flower-view">
      <div className="flower-view-header no-print">
        <button className="btn-back" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1>🌸 My Career Flower</h1>
        {!allComplete && (
          <p className="incomplete-warning">
            ⚠️ {PETALS.length - completedCount} petal(s) not yet completed.
            Complete them all for your full flower.
          </p>
        )}
      </div>

      <div className="flower-diagram-container">
        <FlowerDiagram petalStates={petalStates} />
      </div>

      <div className="flower-details no-print">
        <h2>Petal Details</h2>
        <div className="flower-detail-cards">
          {PETALS.map((petal) => {
            const state = petalStates[petal.id];
            if (!state || state.status === "not-started") {
              return (
                <div
                  key={petal.id}
                  className="flower-detail-card"
                  style={{ borderLeftColor: petal.color, opacity: 0.5 }}
                >
                  <h3>
                    {petal.icon} {petal.name}
                  </h3>
                  <p className="not-completed">Not yet completed</p>
                </div>
              );
            }

            if (petal.type === "input" && state.fields) {
              return (
                <div
                  key={petal.id}
                  className="flower-detail-card"
                  style={{ borderLeftColor: petal.color }}
                >
                  <h3>
                    {petal.icon} {petal.name}
                  </h3>
                  <dl className="money-details">
                    {petal.fields.map((field) =>
                      state.fields[field.id] ? (
                        <div key={field.id}>
                          <dt>{field.label}</dt>
                          <dd>{state.fields[field.id]}</dd>
                        </div>
                      ) : null
                    )}
                  </dl>
                </div>
              );
            }

            return (
              <div
                key={petal.id}
                className="flower-detail-card"
                style={{ borderLeftColor: petal.color }}
              >
                <h3>
                  {petal.icon} {petal.name}
                </h3>
                {state.rankedResults?.length > 0 ? (
                  <ol className="detail-ranking">
                    {state.rankedResults.map((item, i) => (
                      <li key={i}>
                        <span className="detail-rank">{i + 1}</span>
                        {item.name}
                        <span className="detail-wins">
                          ({item.wins} win{item.wins !== 1 ? "s" : ""})
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="in-progress-text">In progress...</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flower-actions no-print">
        <button className="btn-primary btn-large" onClick={handlePrint}>
          🖨️ Print My Flower
        </button>
        <button className="btn-secondary" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <button className="btn-danger" onClick={onReset}>
          🗑️ Start Over
        </button>
      </div>

      {/* Print-only version */}
      <div className="print-only">
        <div className="print-header">
          <h1>My Career Flower</h1>
          <p>The Flower Exercise — What Color Is Your Parachute?</p>
        </div>
        <FlowerDiagram petalStates={petalStates} />
        <div className="print-details">
          {PETALS.map((petal) => {
            const state = petalStates[petal.id];
            if (!state || state.status === "not-started") return null;

            return (
              <div key={petal.id} className="print-petal-detail">
                <h3>
                  {petal.icon} {petal.name}
                </h3>
                {petal.type === "input" && state.fields ? (
                  <ul>
                    {petal.fields.map((field) =>
                      state.fields[field.id] ? (
                        <li key={field.id}>
                          <strong>{field.label}:</strong>{" "}
                          {state.fields[field.id]}
                        </li>
                      ) : null
                    )}
                  </ul>
                ) : state.rankedResults?.length > 0 ? (
                  <ol>
                    {state.rankedResults.map((item, i) => (
                      <li key={i}>{item.name}</li>
                    ))}
                  </ol>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FlowerView;
