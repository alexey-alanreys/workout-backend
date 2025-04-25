import asyncHandler from 'express-async-handler';

import { prisma } from '../prisma.js';

// @desc    Get movements
// @route   GET /api/movements
// @access  Private
export const getNewMovement = asyncHandler(async (req, res) => {
	const movements = await prisma.movement.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
	res.json(movements);
});

// @desc    Create new movement
// @route   POST /api/movements
// @access  Private
export const createNewMovement = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body;

	const movement = await prisma.movement.create({
		data: {
			name,
			times,
			iconPath,
		},
	});

	res.json(movement);
});

// @desc    Update movement
// @route   PUT /api/movements/:id
// @access  Private
export const updateMovement = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body;

	try {
		const movement = await prisma.movement.update({
			where: { id: Number(req.params.id) },
			data: {
				name,
				times,
				iconPath,
			},
		});

		res.json(movement);
	} catch (error) {
		res.status(404);
		throw new Error('Movement not found');
	}
});

// @desc    Delete movement
// @route   DELETE /api/movements/:id
// @access  Private
export const deleteMovement = asyncHandler(async (req, res) => {
	try {
		await prisma.movement.delete({
			where: { id: Number(req.params.id) },
		});

		res.json({ message: 'Movement removed' });
	} catch (error) {
		res.status(404);
		throw new Error('Movement not found');
	}
});
