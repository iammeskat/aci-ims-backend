import { updateCategory } from '@/helpers/category';
import { IReq } from '@/helpers/ts-types';
import { payloadValidator, verifyObjId } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const updateCategoryController = async (req: IReq, res: Response, next: NextFunction) => {
	const id = req.params.id;
	const body = req.body;
	const validKeys = ['title', 'description', 'icon', 'parent'];

	try {
		verifyObjId(id);
		payloadValidator({ payload: body, validKeys });

		await updateCategory({ _id: id }, body);

		res.status(200).json({
			code: 200,
			success: true,
			msg: 'Successfully updated catagory',
		});
	} catch (error) {
		next(error)
	}
};
