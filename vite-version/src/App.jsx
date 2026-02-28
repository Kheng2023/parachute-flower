import { useState, useCallback } from "react";
import "./App.css";
import PETALS from "./data/petals";
import {
  useLocalStorage,
  createInitialState,
  createPetalState,
} from "./hooks/useLocalStorage";
import WelcomeScreen from "./components/WelcomeScreen";
import Dashboard from "./components/Dashboard";
import PetalExercise from "./components/PetalExercise";
import FlowerView from "./components/FlowerView";

function App() {
  const [state, setState, clearState] = useLocalStorage(
    "flower-exercise-state",
    null
  );

  // Derived values
  const appPhase = state?.appPhase || "welcome";
  const activePetalId = state?.activePetalId || null;
  const petalStates = state?.petals || {};
  const hasExistingProgress =
    state !== null && state.appPhase !== "welcome";

  // --- Navigation ---
  const handleStart = useCallback(
    (resume) => {
      if (resume && state) {
        setState({ ...state, appPhase: "dashboard", activePetalId: null });
      } else {
        setState({
          ...createInitialState(),
          appPhase: "dashboard",
          startedAt: new Date().toISOString(),
        });
      }
    },
    [state, setState]
  );

  const handleSelectPetal = useCallback(
    (petalId) => {
      const petalConfig = PETALS.find((p) => p.id === petalId);
      const currentPetalState = petalStates[petalId];

      // Initialize petal state if needed
      const updatedPetalState =
        currentPetalState || createPetalState(petalConfig);

      setState({
        ...state,
        appPhase: "exercise",
        activePetalId: petalId,
        petals: {
          ...petalStates,
          [petalId]: updatedPetalState,
        },
      });
    },
    [state, petalStates, setState]
  );

  const handleBackToDashboard = useCallback(() => {
    setState({
      ...state,
      appPhase: "dashboard",
      activePetalId: null,
    });
  }, [state, setState]);

  const handleViewFlower = useCallback(() => {
    setState({
      ...state,
      appPhase: "flower",
      activePetalId: null,
    });
  }, [state, setState]);

  const handleUpdatePetal = useCallback(
    (updatedPetalState) => {
      setState({
        ...state,
        petals: {
          ...petalStates,
          [activePetalId]: updatedPetalState,
        },
      });
    },
    [state, petalStates, activePetalId, setState]
  );

  const handleReset = useCallback(() => {
    if (
      window.confirm(
        "Are you sure you want to start over? All your progress will be lost."
      )
    ) {
      clearState();
    }
  }, [clearState]);

  // --- Render ---
  return (
    <div className="App">
      {appPhase === "welcome" && (
        <WelcomeScreen
          onStart={handleStart}
          hasExistingProgress={hasExistingProgress}
        />
      )}

      {appPhase === "dashboard" && (
        <Dashboard
          petalStates={petalStates}
          onSelectPetal={handleSelectPetal}
          onViewFlower={handleViewFlower}
        />
      )}

      {appPhase === "exercise" && activePetalId && (
        <PetalExercise
          key={activePetalId}
          petalId={activePetalId}
          petalState={petalStates[activePetalId]}
          onUpdate={handleUpdatePetal}
          onBack={handleBackToDashboard}
        />
      )}

      {appPhase === "flower" && (
        <FlowerView
          petalStates={petalStates}
          onBack={handleBackToDashboard}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
