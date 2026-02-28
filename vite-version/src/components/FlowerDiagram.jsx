import PETALS from "../data/petals";

/**
 * SVG Flower Diagram — The final output of the Flower Exercise.
 * Each petal is a leaf shape arranged around a center circle,
 * showing the top ranked items from each petal exercise.
 */
function FlowerDiagram({ petalStates }) {
  const size = 800;
  const cx = size / 2;
  const cy = size / 2;
  const petalLength = 210;
  const petalWidth = 130;
  const centerRadius = 90;

  // 7 petals evenly spaced
  const angleStep = 360 / 7;

  // Generate a petal shape path centered at origin, pointing up
  const petalPath = (length, width) => {
    const hw = width / 2;
    return `
      M 0,0
      C ${hw * 0.4},-${length * 0.15} ${hw},-${length * 0.4} ${hw},-${length * 0.55}
      C ${hw},-${length * 0.7} ${hw * 0.7},-${length * 0.9} 0,-${length}
      C -${hw * 0.7},-${length * 0.9} -${hw},-${length * 0.7} -${hw},-${length * 0.55}
      C -${hw},-${length * 0.4} -${hw * 0.4},-${length * 0.15} 0,0
      Z
    `;
  };

  // Get text lines for a petal (top 3-5 items)
  const getPetalText = (petalConfig, state) => {
    if (!state || state.status === "not-started") {
      return ["(not yet completed)"];
    }
    if (petalConfig.type === "input" && state.fields) {
      const lines = [];
      if (state.fields.minimumSalary)
        lines.push(`Min: ${state.fields.minimumSalary}`);
      if (state.fields.desiredSalary)
        lines.push(`Goal: ${state.fields.desiredSalary}`);
      if (state.fields.responsibility) {
        const short = state.fields.responsibility.split("—")[0].trim();
        lines.push(short);
      }
      return lines.length > 0 ? lines : ["(completed)"];
    }
    if (state.rankedResults?.length > 0) {
      return state.rankedResults.slice(0, 5).map((item, i) => `${i + 1}. ${item.name}`);
    }
    return ["(in progress)"];
  };

  // Wrap text to fit inside petal width
  const truncate = (text, maxLen = 22) => {
    return text.length > maxLen ? text.substring(0, maxLen - 1) + "…" : text;
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className="flower-diagram"
      style={{ width: "100%", maxWidth: "700px", height: "auto" }}
    >
      {/* Background */}
      <rect width={size} height={size} fill="white" rx="20" />

      {/* Petals */}
      {PETALS.map((petal, i) => {
        const angle = angleStep * i - 90; // Start from top
        const rad = (angle * Math.PI) / 180;
        const state = petalStates[petal.id];
        const textLines = getPetalText(petal, state);
        const isComplete = state?.status === "completed";

        return (
          <g
            key={petal.id}
            transform={`translate(${cx}, ${cy}) rotate(${angle + 90})`}
          >
            {/* Petal shape */}
            <path
              d={petalPath(petalLength, petalWidth)}
              fill={isComplete ? petal.color : petal.lightColor}
              stroke={petal.color}
              strokeWidth="2"
              opacity={isComplete ? 0.85 : 0.5}
            />

            {/* Petal label and content */}
            <g transform={`rotate(-${angle + 90})`}>
              {/* Petal name at the outer edge */}
              <text
                y={-petalLength * 0.82}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill={isComplete ? "#fff" : petal.color}
                style={{ textShadow: isComplete ? "0 1px 2px rgba(0,0,0,0.3)" : "none" }}
              >
                {petal.icon} {petal.name}
              </text>
              {/* Ranked items */}
              {textLines.map((line, li) => (
                <text
                  key={li}
                  y={-petalLength * 0.7 + li * 14}
                  textAnchor="middle"
                  fontSize="9"
                  fill={isComplete ? "#fff" : "#888"}
                  style={{ textShadow: isComplete ? "0 1px 2px rgba(0,0,0,0.3)" : "none" }}
                >
                  {truncate(line, 26)}
                </text>
              ))}
            </g>
          </g>
        );
      })}

      {/* Center circle */}
      <circle cx={cx} cy={cy} r={centerRadius} fill="#fff" stroke="#535bf2" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={centerRadius - 4} fill="#f8f9ff" stroke="none" />

      {/* Center text */}
      <text
        x={cx}
        y={cy - 20}
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        fill="#535bf2"
      >
        🌸
      </text>
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="#333"
      >
        My Ideal Job
      </text>
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fontSize="9"
        fill="#888"
      >
        The Flower Exercise
      </text>
      <text
        x={cx}
        y={cy + 34}
        textAnchor="middle"
        fontSize="8"
        fill="#aaa"
      >
        What Color Is Your Parachute?
      </text>
    </svg>
  );
}

export default FlowerDiagram;
