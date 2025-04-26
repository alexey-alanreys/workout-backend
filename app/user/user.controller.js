import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';
import { calculateMinutes } from '../utils/calculate-minutes.utils.js';
import { userFields } from '../utils/user.utils.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		select: userFields,
	});

	const completedExercises = await prisma.exerciseLog.findMany({
		where: {
			userId: req.user.id,
			isCompleted: true,
		},
		include: {
			exercise: true,
		},
	});
	let totalMinutes = calculateMinutes(completedExercises);

	const workouts = await prisma.workoutLog.count({
		where: {
			userId: user.id,
			isCompleted: true,
		},
	});

	const totalWeight = await prisma.exerciseTime.aggregate({
		where: {
			exerciseLog: {
				userId: req.user.id,
			},
			isCompleted: true,
		},

		_sum: {
			weight: true,
		},
	});

	res.json({
		...user,
		statistics: [
			{
				label: 'Minutes',
				value: totalMinutes,
			},
			{
				label: 'Workouts',
				value: workouts,
			},
			{
				label: 'Kgs',
				value: totalWeight._sum.weight || 0,
			},
		],
	});
});
