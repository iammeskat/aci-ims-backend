import { IReq } from '@/helpers/ts-types';
import { getUser } from '@/helpers/user';
import { NextFunction, Response } from 'express';

export const readMyProfileController = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await getUser({ _id: req.user?._id }, '-password');

		res.json({
			success: true,
			data: user,
			msg: 'Profile retrieved successfully',
		});
	} catch (error: any) {
		next(error);
	}
};
