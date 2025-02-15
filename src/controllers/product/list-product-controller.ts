import { getListProduct } from '@/helpers/product';
import { IParsedQs, IReq } from '@/helpers/ts-types';
import { getFilters, payloadValidator } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const listProductController = async (req: IReq, res: Response, next: NextFunction) => {
	let query: IParsedQs = req.query;
	const { page, count, offset, search } = getFilters(query);

	let validKeys = ['count', 'page'];

	try {
		payloadValidator({ payload: query, validKeys });

		let result = await getListProduct({
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
