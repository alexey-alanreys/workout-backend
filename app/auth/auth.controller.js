import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';
import { userFields } from '../utils/user.utils.js';

import { generateToken } from './generate-token.js';

// @desc    Auth user
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		res.status(401);
		throw new Error('Invalid email or password');
	}

	const isValidPassword = await verify(user.password, password);

	if (isValidPassword) {
		const token = generateToken(user.id);
		res.json({ user, token });
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (isHaveUser) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await prisma.user.create({
		data: {
			email,
			name: faker.person.firstName(),
			password: await hash(password),
		},
		select: userFields,
	});

	const token = generateToken(user.id);

	res.json({ user, token });
});
