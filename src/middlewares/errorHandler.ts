import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(400).json({
		success: false,
		msg: err.message || 'An unknown error occurred.',
	});
};
