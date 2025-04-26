import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createNewExercise,
	deleteExercise,
	getExercise,
	updateExercise,
} from './exercise.controller.js';
import {
	completeExerciseLog,
	createNewExerciseLog,
	getExerciseLog,
	updateExerciseLogTime,
} from './log/exercise-log.controller.js';

const router = express.Router();

router.route('/').get(protect, getExercise);
router.route('/').post(protect, createNewExercise);

router.route('/:id').put(protect, updateExercise);
router.route('/:id').delete(protect, deleteExercise);

router.route('/log/:id').get(protect, getExerciseLog);
router.route('/log/:exerciseId').post(protect, createNewExerciseLog);

router.route('/log/time/:id').put(protect, updateExerciseLogTime);

router.route('/log/complete/:id').patch(protect, completeExerciseLog);

export default router;
