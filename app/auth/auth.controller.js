import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

// @desc    Auth user
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const users = await prisma.users.findMany({
		where: {
			password1: 'dddd',
		},
	});

	res.json(users);
});
