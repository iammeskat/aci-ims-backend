import * as routes from '@/routes';
import express from 'express';
import { authMiddleware } from './middlewares';

const api = express.Router();

api.use('/auth', routes.authRoutes);
api.use('/user', authMiddleware, routes.userRoutes);
api.use('/category', authMiddleware, routes.categoryRoutes);
api.use('/product', authMiddleware, routes.productRoutes);

export default api;
