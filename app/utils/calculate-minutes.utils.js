export const calculateMinutes = (exercises) => {
	return exercises.reduce((total, exercise) => {
		const times = exercise.exercise?.times ?? exercise.times ?? 0;
		return total + times * 3;
	}, 0);
};
