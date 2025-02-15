import {
	addUserController,
	deleteUserController,
	getUserController,
	listUserController,
	updateUserController,
} from '@/controllers';
import { validateUser, validateUserUpdate } from '@/middlewares';
import express from 'express';

const routes = express.Router();

routes
	.get('/', listUserController)
	.post('/', validateUser, addUserController)
	.patch('/:id', validateUserUpdate, updateUserController)
	.delete('/:id', deleteUserController)
	.get('/:id', getUserController);

export const userRoutes = routes;
