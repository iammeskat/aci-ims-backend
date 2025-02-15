import {
	readMyProfileController,
	updateMyProfileController,
	userLoginController
} from '@/controllers';
import {
	authMiddleware,
	validateLogin,
	validateUserUpdate
} from '@/middlewares';
import express from 'express';

const routes = express.Router();

routes
	.post('/login', validateLogin, userLoginController)
	.get('/profile', authMiddleware, readMyProfileController)
	.patch(
		'/profile',
		authMiddleware,
		validateUserUpdate,
		updateMyProfileController
	);

export const authRoutes = routes;
