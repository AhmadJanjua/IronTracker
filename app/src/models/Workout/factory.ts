import { Workout } from "./types"
import { dateToString } from "./helper";

export function WorkoutSession(): Workout {
	return {
		id: crypto.randomUUID(),
		date: dateToString(Date.now()),
		kind: "",
		exercises: [],
		rests: []
	};
}