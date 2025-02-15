import { IParsedQs, IReq } from '@/helpers/ts-types';
import { getListUser } from '@/helpers/user';
import { getFilters, payloadValidator } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const listUserController = async (req: IReq, res: Response, next: NextFunction) => {
	let query: IParsedQs = req.query;
	const { page, count, offset, search } = getFilters(query);

	let validKeys = ['count', 'page'];

	try {
		payloadValidator({ payload: query, validKeys });

		let result = await getListUser({
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
