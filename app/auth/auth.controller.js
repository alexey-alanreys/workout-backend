import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';
import { userFields } from '../utils/user.utils.js';

import { generateToken } from './generate-token.js';

// @desc    Auth user
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const users = await prisma.users.findMany();

	res.json(users);
});

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const isHaveUser = await prisma.users.findUnique({
		where: {
			email,
		},
	});

	if (isHaveUser) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await prisma.users.create({
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
