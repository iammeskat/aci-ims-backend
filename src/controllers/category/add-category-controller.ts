import { createCategory } from '@/helpers/category';
import { IReq } from '@/helpers/ts-types';
import { NextFunction, Response } from 'express';

export const addCategoryController = async (req: IReq, res: Response, next: NextFunction) => {
	const body = req.body;

	try {

		const newCategory = await createCategory(body);

		res.status(201).json({
			code: 201,
			success: true,
			msg: 'Successfully added category.',
			data: newCategory,
		});
	} catch (error) {
		next(error)
	}
};
