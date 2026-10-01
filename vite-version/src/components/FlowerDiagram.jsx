import { Flower2 } from "lucide-react";
import PETALS from "../data/petals";

/**
 * SVG Flower Diagram — The final output of the Flower Exercise.
 * Each petal is a leaf shape arranged around a center circle,
 * showing the top ranked items from each petal exercise.
 */
function FlowerDiagram({ petalStates }) {
  const size = 480;
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
        const isComplete = petalStates[petal.id]?.status === "completed";

        return (
          <g
            key={petal.id}
            transform={`translate(${cx}, ${cy}) rotate(${angleStep * i})`}
          >
            {/* Petal shape */}
            <path
              d={petalPath(petalLength, petalWidth)}
              fill={isComplete ? petal.color : petal.lightColor}
              stroke={petal.color}
              strokeWidth="2"
              opacity={isComplete ? 0.85 : 0.5}
            />
          </g>
        );
      })}

      {/* Petal labels, drawn after every petal so a neighbouring petal never
          covers them. Each label moves out along its petal, then undoes the
          petal's rotation there so the text stays upright. */}
      {PETALS.map((petal, i) => {
        const rotation = angleStep * i;
        const state = petalStates[petal.id];
        const textLines = getPetalText(petal, state);
        const isComplete = state?.status === "completed";

        return (
          <g
            key={petal.id}
            transform={`translate(${cx}, ${cy}) rotate(${rotation}) translate(0, ${-petalLength * 0.72}) rotate(${-rotation})`}
          >
            <text
              y={-30}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill={isComplete ? "#1f2937" : petal.color}
            >
              {petal.name}
            </text>
            {textLines.map((line, li) => (
              <text
                key={li}
                y={-14 + li * 13}
                textAnchor="middle"
                fontSize="9"
                fill={isComplete ? "#1f2937" : "#888"}
              >
                {truncate(line, 26)}
              </text>
            ))}
          </g>
        );
      })}

      {/* Center circle */}
      <circle cx={cx} cy={cy} r={centerRadius} fill="#fff" stroke="#535bf2" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={centerRadius - 4} fill="#f8f9ff" stroke="none" />

      {/* Center text */}
      <Flower2 x={cx - 9} y={cy - 36} style={{ width: 18, height: 18 }} color="#535bf2" />
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
