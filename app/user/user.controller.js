import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';
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

	res.json(user);
});
