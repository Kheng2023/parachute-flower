import { useState } from "react";

function MoneyPetalForm({ petalConfig, petalState, onUpdate, onBack }) {
  const [fields, setFields] = useState(petalState.fields || {});

  const handleFieldChange = (fieldId, value) => {
    const updated = { ...fields, [fieldId]: value };
    setFields(updated);
  };

  const handleSave = () => {
    onUpdate({
      ...petalState,
      fields,
      status: "completed",
    });
    onBack();
  };

  const hasContent = Object.values(fields).some(
    (v) => v && v.trim && v.trim() !== ""
  );

  return (
    <div className="petal-exercise">
      <div
        className="petal-exercise-header"
        style={{ borderBottomColor: petalConfig.color }}
      >
        <button className="btn-back" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <div className="petal-exercise-title">
          <span className="petal-exercise-icon">{petalConfig.icon}</span>
          <div>
            <h2 style={{ color: petalConfig.color }}>{petalConfig.name}</h2>
            <p>{petalConfig.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="instructions-card">
        <h3>Instructions</h3>
        <p>{petalConfig.description}</p>
        <ul>
          {petalConfig.instructions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
      </div>

      <div className="money-form">
        {petalConfig.fields.map((field) => (
          <div key={field.id} className="money-field">
            <label htmlFor={field.id}>
              <strong>{field.label}</strong>
              {field.helpText && (
                <span className="field-help">{field.helpText}</span>
              )}
            </label>
            {field.type === "select" ? (
              <select
                id={field.id}
                value={fields[field.id] || ""}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
              >
                <option value="">Select one...</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type="text"
                value={fields[field.id] || ""}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder || ""}
              />
            )}
          </div>
        ))}
      </div>

      <div className="rank-step-actions">
        <button className="btn-secondary" onClick={onBack}>
          ← Save & Return Later
        </button>
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={!hasContent}
          style={{ backgroundColor: petalConfig.color }}
        >
          Complete This Petal ✓
        </button>
      </div>
    </div>
  );
}

export default MoneyPetalForm;
