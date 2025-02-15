import { getListCategory } from '@/helpers/category';
import { IParsedQs, IReq } from '@/helpers/ts-types';
import { getFilters } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const listCategoryController = async (req: IReq, res: Response, next: NextFunction) => {
	let query: IParsedQs = req.query;
	const { page, count, offset, search } = getFilters(query);

	try {

		let result = await getListCategory({
			offset,
			search,
			limit: count,
			currentPage: page,
			...query,
		});

		res.status(200).json({
			code: 200,
			success: true,
			msg: 'Successfully retrieved data',
			data: result,
		});
	} catch (error) {
		next(error)
	}
};
