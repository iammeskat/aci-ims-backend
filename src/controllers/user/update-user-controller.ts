import { IReq } from '@/helpers/ts-types';
import { updateUser } from '@/helpers/user';
import { payloadValidator, verifyObjId } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const updateUserController = async (req: IReq, res: Response, next: NextFunction) => {
	const id = req.params.id;
	const body = req.body;
	const validKeys = ['title', 'description', 'icon', 'parent'];

	try {
		verifyObjId(id);
		payloadValidator({ payload: body, validKeys });

		await updateUser({ _id: id }, body);

		res.status(200).json({
			code: 200,
			success: true,
			msg: 'Successfully updated catagory',
		});
	} catch (error) {
		next(error)
	}
};
