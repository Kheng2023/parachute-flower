import { useState, useEffect } from "react";
import { getPetalById, getComparisonCount } from "../data/petals";
import { createPetalState } from "../hooks/useLocalStorage";
import AddItemForm from "./AddItemForm";
import ComparisonView from "./ComparisonView";
import RankingGrid from "./RankingGrid";
import MoneyPetalForm from "./MoneyPetalForm";

function PetalExercise({ petalId, petalState, onUpdate, onBack }) {
  const petalConfig = getPetalById(petalId);

  // Initialize state if not started yet
  useEffect(() => {
    if (!petalState) {
      onUpdate(createPetalState(petalConfig));
    }
  }, [petalId]);

  if (!petalConfig || !petalState) return null;

  // Money petal has a different flow
  if (petalConfig.type === "input") {
    return (
      <MoneyPetalForm
        petalConfig={petalConfig}
        petalState={petalState}
        onUpdate={onUpdate}
        onBack={onBack}
      />
    );
  }

  const { items, step, currentPairIndex, pairs, comparisons } = petalState;

  // --- ADD ITEMS STEP ---
  const addItem = (itemName) => {
    if (
      itemName.trim() !== "" &&
      !items.find((item) => item.name === itemName.trim()) &&
      items.length < petalConfig.maxItems
    ) {
      onUpdate({
        ...petalState,
        status: "in-progress",
        items: [...items, { name: itemName.trim(), wins: 0 }],
      });
    }
  };

  const removeItem = (index) => {
    onUpdate({
      ...petalState,
      items: items.filter((_, i) => i !== index),
    });
  };

  const startComparison = () => {
    if (items.length < petalConfig.minItems) return;
    const generatedPairs = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        generatedPairs.push([items[i], items[j]]);
      }
    }
    onUpdate({
      ...petalState,
      status: "in-progress",
      step: "compare",
      pairs: generatedPairs,
      currentPairIndex: 0,
      comparisons: {},
      // Reset wins
      items: items.map((item) => ({ ...item, wins: 0 })),
    });
  };

  // --- COMPARISON STEP ---
  const handleComparison = (preferredItemName) => {
    const updatedItems = items.map((item) => {
      if (item.name === preferredItemName) {
        return { ...item, wins: item.wins + 1 };
      }
      return item;
    });

    const [itemA, itemB] = pairs[currentPairIndex];
    const winner = preferredItemName;
    const loser = itemA.name === winner ? itemB.name : itemA.name;
    const updatedComparisons = { ...comparisons };
    if (!updatedComparisons[winner]) updatedComparisons[winner] = {};
    updatedComparisons[winner][loser] =
      (updatedComparisons[winner][loser] || 0) + 1;

    const isLast = currentPairIndex >= pairs.length - 1;
    const ranked = isLast
      ? [...updatedItems].sort((a, b) => b.wins - a.wins)
      : [];

    onUpdate({
      ...petalState,
      items: updatedItems,
      comparisons: updatedComparisons,
      currentPairIndex: isLast ? currentPairIndex : currentPairIndex + 1,
      step: isLast ? "rank" : "compare",
      status: isLast ? "completed" : "in-progress",
      rankedResults: ranked,
    });
  };

  const goBackOneComparison = () => {
    if (currentPairIndex <= 0) return;

    const prevIndex = currentPairIndex - 1;
    const [itemA, itemB] = pairs[prevIndex];

    // Figure out who won the previous comparison
    let previousWinner = null;
    if (comparisons[itemA.name]?.[itemB.name]) {
      previousWinner = itemA.name;
    } else if (comparisons[itemB.name]?.[itemA.name]) {
      previousWinner = itemB.name;
    }

    if (!previousWinner) return;

    const previousLoser =
      previousWinner === itemA.name ? itemB.name : itemA.name;

    // Undo the win
    const updatedItems = items.map((item) => {
      if (item.name === previousWinner) {
        return { ...item, wins: Math.max(0, item.wins - 1) };
      }
      return item;
    });

    // Undo the comparison entry
    const updatedComparisons = { ...comparisons };
    if (updatedComparisons[previousWinner]?.[previousLoser]) {
      updatedComparisons[previousWinner][previousLoser] -= 1;
      if (updatedComparisons[previousWinner][previousLoser] <= 0) {
        delete updatedComparisons[previousWinner][previousLoser];
      }
    }

    onUpdate({
      ...petalState,
      items: updatedItems,
      comparisons: updatedComparisons,
      currentPairIndex: prevIndex,
    });
  };

  // --- RANK STEP ---
  const rankedItems =
    petalState.rankedResults?.length > 0
      ? petalState.rankedResults
      : [...items].sort((a, b) => b.wins - a.wins);

  const goBackToAdd = () => {
    onUpdate({
      ...petalState,
      step: "add",
      status: "in-progress",
    });
  };

  const totalComparisons = getComparisonCount(items.length);

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

      {step === "add" && (
        <div className="petal-add-step">
          <div className="instructions-card">
            <h3>Instructions</h3>
            <p>{petalConfig.description}</p>
            <ul>
              {petalConfig.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>

          {petalConfig.exampleItems && (
            <div className="examples-card">
              <h4>Need ideas? Here are some examples:</h4>
              <div className="example-chips">
                {petalConfig.exampleItems.map((ex, i) => (
                  <button
                    key={i}
                    className="chip"
                    onClick={() => addItem(ex)}
                    disabled={
                      items.length >= petalConfig.maxItems ||
                      items.find((item) => item.name === ex)
                    }
                    style={{ "--chip-color": petalConfig.color }}
                  >
                    + {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AddItemForm
            onAddItem={addItem}
            disabled={items.length >= petalConfig.maxItems}
            placeholder={`Enter a ${petalConfig.name.toLowerCase()} item...`}
          />

          {items.length > 0 && (
            <div className="items-list-card">
              <h3>
                Your Items ({items.length}/{petalConfig.maxItems})
              </h3>
              <ul className="items-list-editable">
                {items.map((item, index) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <button
                      className="btn-remove"
                      onClick={() => removeItem(index)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="add-step-actions">
            {items.length < petalConfig.minItems && (
              <p className="help-text">
                Add at least {petalConfig.minItems - items.length} more item(s).
                (Min: {petalConfig.minItems}, Max: {petalConfig.maxItems})
              </p>
            )}
            {items.length >= petalConfig.minItems && (
              <p className="help-text success-text">
                ✓ Ready to compare! ({totalComparisons} comparisons for{" "}
                {items.length} items)
              </p>
            )}
            <button
              className="btn-primary"
              onClick={startComparison}
              disabled={items.length < petalConfig.minItems}
              style={{ backgroundColor: petalConfig.color }}
            >
              Start Pairwise Comparison →
            </button>
          </div>
        </div>
      )}

      {step === "compare" && pairs.length > 0 && (
        <div className="petal-compare-step">
          <div className="comparison-progress">
            <div className="comparison-progress-bar">
              <div
                className="comparison-progress-fill"
                style={{
                  width: `${(currentPairIndex / pairs.length) * 100}%`,
                  backgroundColor: petalConfig.color,
                }}
              />
            </div>
            <span>
              {currentPairIndex + 1} of {pairs.length} comparisons
            </span>
          </div>
          <ComparisonView
            item1={pairs[currentPairIndex][0]}
            item2={pairs[currentPairIndex][1]}
            onCompare={handleComparison}
            current={currentPairIndex + 1}
            total={pairs.length}
            color={petalConfig.color}
          />
          {currentPairIndex > 0 && (
            <button className="btn-secondary" onClick={goBackOneComparison}>
              ← Undo Last Choice
            </button>
          )}
        </div>
      )}

      {step === "rank" && (
        <div className="petal-rank-step">
          <h3 style={{ color: petalConfig.color }}>
            {petalConfig.icon} {petalConfig.name} — Your Ranking
          </h3>
          <RankingGrid items={rankedItems} comparisons={comparisons} />

          <div className="ranking-list-card">
            <h3>Your Priority Ranking</h3>
            <ol className="ranking-list">
              {rankedItems.map((item, idx) => (
                <li key={item.name}>
                  <span className="rank-number" style={{ backgroundColor: petalConfig.color }}>
                    {idx + 1}
                  </span>
                  <span className="rank-name">{item.name}</span>
                  <span className="rank-wins">
                    {item.wins} win{item.wins !== 1 ? "s" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rank-step-actions">
            <button className="btn-secondary" onClick={goBackToAdd}>
              ← Re-do this petal
            </button>
            <button
              className="btn-primary"
              onClick={onBack}
              style={{ backgroundColor: petalConfig.color }}
            >
              Back to Dashboard ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetalExercise;
