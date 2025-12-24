import { useState } from "preact/hooks";

import Stopwatch from "./components/Stopwatch";
import type { Workout } from "../../models/Workout/types";
import { WorkoutSession } from "../../models/Workout/factory";

import WorkoutKindModal from "./components/WorkoutKind";
import HelpToggle from "./components/HelpToggle";
import AddExercise from "./components/AddExercise";

function StartWorkout() {
  const [workout, setWorkout] = useState<Workout>(() => WorkoutSession());

  function setKind(kind: string): void {
    setWorkout((prev) => ({ ...prev, kind }));
  }

  return (
    <div>
	  { !workout.kind ? (
		<WorkoutKindModal onConfirm={setKind} />
	):(
		<div>
		<h1>{workout.kind} Day - {workout.date}</h1>

		<HelpToggle />

		<h2>Stopwatch</h2>
		<Stopwatch />

		<h2>Add Exercise</h2>
		<AddExercise />
		</div>
	)}

    </div>
  );
};

export default StartWorkout;
