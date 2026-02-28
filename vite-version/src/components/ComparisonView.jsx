function ComparisonView({ item1, item2, onCompare, current, total, color }) {
  const accentColor = color || "#535bf2";

  return (
    <div className="comparison-card">
      <h2 style={{ color: accentColor, marginBottom: "0.5em" }}>
        Compare ({current}/{total})
      </h2>
      <p style={{ marginBottom: "1.5em", color: "#2d3a4a" }}>
        Which is more important to you?
      </p>
      <div className="comparison-buttons">
        <button
          className="comparison-choice"
          onClick={() => onCompare(item1.name)}
          style={{ borderColor: accentColor }}
        >
          {item1.name}
        </button>
        <span className="comparison-vs">vs</span>
        <button
          className="comparison-choice"
          onClick={() => onCompare(item2.name)}
          style={{ borderColor: accentColor }}
        >
          {item2.name}
        </button>
      </div>
      <p className="comparison-hint">Press 1 or 2, or click your choice</p>
    </div>
  );
}

export default ComparisonView;
