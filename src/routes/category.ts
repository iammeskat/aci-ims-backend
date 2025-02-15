import {
	addCategoryController,
	deleteCategoryController,
	getCategoryController,
	listCategoryController,
	updateCategoryController,
} from '@/controllers';
import { validateCategory, validateListCategory, validateUpdateCategory } from '@/middlewares/validators/categoryValidator';
import express from 'express';

const routes = express.Router();

routes
	.get('/', validateListCategory, listCategoryController)
	.post('/', validateCategory, addCategoryController)
	.patch('/:id', validateUpdateCategory, updateCategoryController)
	.delete('/:id', deleteCategoryController)
	.get('/:id', getCategoryController);

export const categoryRoutes = routes;
