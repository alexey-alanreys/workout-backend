import { prisma } from '../prisma.js';

// @desc    Auth user
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
	const users = await prisma.users.findMany();

	res.json(users);
};
