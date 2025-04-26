import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createNewWorkoutLog,
	getWorkoutLog,
	updateCompleteWorkoutLog,
} from './log/workout-log.controller.js';
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

router.route('/log/:id').get(protect, getWorkoutLog);
router.route('/log/:id').post(protect, createNewWorkoutLog);

router.route('/log/complete/:id').patch(protect, updateCompleteWorkoutLog);

export default router;
