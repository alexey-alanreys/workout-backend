export const calculateMinutes = (exercises) => {
	return exercises.reduce(
		(total, exercise) => (total += exercise.times * 3),
		0,
	);
};
