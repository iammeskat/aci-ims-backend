import { deleteCategory } from '@/helpers/category';
import { IReq } from '@/helpers/ts-types';
import { verifyObjId } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const deleteCategoryController = async (req: IReq, res: Response, next: NextFunction) => {
	const id = req.params.id;
	try {
		verifyObjId(id);

		const deleted = await deleteCategory({ _id: id });
		if (!deleted) throw Error('Cannot find category');

		res.status(200).json({
			code: 200,
			success: true,
			msg: 'Successfully deleted category',
		});
	} catch (error) {
		next(error)
	}
};
