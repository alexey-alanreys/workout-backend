import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout,
} from './workout.controller.js';

const router = express.Router();

router.route('/').get(protect, getWorkouts);
router.route('/').post(protect, createNewWorkout);

router.route('/:id').get(protect, getWorkout);
router.route('/:id').put(protect, updateWorkout);
router.route('/:id').delete(protect, deleteWorkout);

export default router;
