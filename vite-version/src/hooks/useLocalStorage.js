import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "flower-exercise-state";

/**
 * Custom hook for persisting app state to localStorage.
 * Returns [state, setState, clearState]
 */
export function useLocalStorage(key = STORAGE_KEY, initialValue = null) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Failed to load state from localStorage:", e);
    }
    return initialValue;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      if (state === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (e) {
      console.warn("Failed to save state to localStorage:", e);
    }
  }, [key, state]);

  const clearState = useCallback(() => {
    setState(initialValue);
    localStorage.removeItem(key);
  }, [key, initialValue]);

  return [state, setState, clearState];
}

/**
 * Create the initial state for the entire Flower Exercise app.
 */
export function createInitialState() {
  return {
    // "welcome" | "dashboard" | "exercise" | "flower"
    appPhase: "welcome",
    // Which petal is currently active (petal id string or null)
    activePetalId: null,
    // Per-petal data, keyed by petal id
    petals: {},
    // Timestamp of when the exercise was started
    startedAt: null,
    // Timestamp of when the exercise was completed
    completedAt: null,
  };
}

/**
 * Create initial state for a single petal exercise.
 */
export function createPetalState(petalConfig) {
  if (petalConfig.type === "input") {
    return {
      status: "not-started", // "not-started" | "in-progress" | "completed"
      type: "input",
      fields: {},
    };
  }

  return {
    status: "not-started", // "not-started" | "in-progress" | "completed"
    type: "ranking",
    items: [],
    pairs: [],
    currentPairIndex: 0,
    comparisons: {},
    rankedResults: [],
    // "add" | "compare" | "rank"
    step: "add",
  };
}
