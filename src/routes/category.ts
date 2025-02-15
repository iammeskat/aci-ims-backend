import {
	addCategoryController,
	deleteCategoryController,
	getCategoryController,
	listCategoryController,
	updateCategoryController,
} from '@/controllers';
import { validateCategory } from '@/middlewares/validators/categoryValidator';
import express from 'express';

const routes = express.Router();

routes
	.get('/', listCategoryController)
	.post('/', validateCategory, addCategoryController)
	.patch('/:id', updateCategoryController)
	.delete('/:id', deleteCategoryController)
	.get('/:id', getCategoryController);

export const categoryRoutes = routes;
