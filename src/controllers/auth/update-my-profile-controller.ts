import { IReq } from '@/helpers/ts-types';
import { updateUser } from '@/helpers/user';
import { NextFunction, Response } from 'express';

export const updateMyProfileController = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const body = req.body;

	try {
		const updatedUser = await updateUser({ _id: req.user?._id }, body);
		if (!updatedUser) throw Error('User not found');

		const userData = updatedUser.toObject() as Record<string, any>;
		delete userData.password;

		res.json({
			code: 200,
			success: true,
			msg: 'User profile updated successfully',
			data: userData,
		});
	} catch (error) {
		next(error);
	}
};
