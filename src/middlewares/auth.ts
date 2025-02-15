import { getErrorMsg } from '@/helpers/utils';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IAuthPayload, IReq } from '../helpers/ts-types';
require('dotenv').config();

export const authMiddleware = (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.header('token');
		if (!token) throw Error('Access Denied. No token provided.');

		const decoded = verify(
			token,
			process.env.JWT_SECRET || ''
		) as IAuthPayload;

		req.user = decoded;
		req.is_super = decoded.role === 1;
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			msg: getErrorMsg(error),
		});
	}
};

export const optionalAuthMiddleware = (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.header('token');
		if (token) {
			const decoded = verify(
				token,
				process.env.JWT_SECRET || ''
			) as IAuthPayload;

			if (decoded?._id) {
				req.user = decoded;
				req.is_super = decoded.role === 1;
			}
		}

		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			msg: getErrorMsg(error),
		});
	}
};
