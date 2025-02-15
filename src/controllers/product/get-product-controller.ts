import { getProduct } from '@/helpers/product';
import { IReq } from '@/helpers/ts-types';
import { verifyObjId } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const getProductController = async (req: IReq, res: Response, next: NextFunction) => {
	const id = req.params.id;
	try {
		verifyObjId(id);
		const data = await getProduct({ _id: id });
		if (!data) throw Error('Could not retrieve data!');

		res.status(200).json({
			code: 200,
			success: true,
			msg: 'Successfully retrieved data!',
			data,
		});
	} catch (error) {
		next(error)
	}
};
