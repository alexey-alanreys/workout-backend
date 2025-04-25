import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createNewExercise,
	deleteExercise,
	getExercise,
	updateExercise,
} from './exercise.controller.js';

const router = express.Router();

router.route('/').get(protect, getExercise);
router.route('/').post(protect, createNewExercise);

router.route('/:id').put(protect, updateExercise);
router.route('/:id').delete(protect, deleteExercise);

export default router;
