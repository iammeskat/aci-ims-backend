import {
	addProductController,
	deleteProductController,
	getProductController,
	listProductController,
	updateProductController,
} from '@/controllers';
import { validateBarcode, validateProduct, validateUpdateProduct } from '@/middlewares/validators/productValidator';
import express from 'express';

const routes = express.Router();

routes
	.get('/', listProductController)
	.post('/', validateProduct, addProductController)
	.patch('/:id', validateUpdateProduct, updateProductController)
	.delete('/:id', deleteProductController)
	.get('/:id', getProductController)
	.post('/add-by-barcode', validateBarcode, addProductController)

export const productRoutes = routes;
