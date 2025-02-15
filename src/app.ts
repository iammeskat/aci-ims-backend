import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import api from './api';
import { errorHandler } from './middlewares';

dotenv.config();

const app = express();
exports.app = app;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', api);

app.use(errorHandler);

app.use((req: Request, res: Response) => {
	res.status(404).json({ success: false, msg: 'Resource not found' });
});

app.use((err: Error, req: Request, res: Response) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		msg: 'Internal server error',
		error: err.message,
	});
});

export default app;
