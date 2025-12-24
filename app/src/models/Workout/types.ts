export type ExerciseSet = {
	time: number;
	reps: number;
	weight: number | null;
	units: string | null;
};

export type Exercise = {
	name: string;
	sets: ExerciseSet[];
};

export type Rest = {
	time: number;
};

export type Workout = {
	id: string;
	kind: string
	date: string;
	exercises: Exercise[];
	rests: Rest[];
};
