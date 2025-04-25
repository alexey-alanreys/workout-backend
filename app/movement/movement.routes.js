import express from 'express';

import { protect } from '../middleware/auth.middleware.js';

import {
	createNewMovement,
	deleteMovement,
	getNewMovement,
	updateMovement,
} from './movement.controller.js';

const router = express.Router();

router.route('/').get(protect, getNewMovement);
router.route('/').post(protect, createNewMovement);
router.route('/:id').put(protect, updateMovement);
router.route('/:id').delete(protect, deleteMovement);

export default router;
