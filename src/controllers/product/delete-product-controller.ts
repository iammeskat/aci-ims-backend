import { deleteProduct } from '@/helpers/product';
import { IReq } from '@/helpers/ts-types';
import { verifyObjId } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const deleteProductController = async (req: IReq, res: Response, next: NextFunction) => {
	const id = req.params.id;
	try {
		verifyObjId(id);

		const deleted = await deleteProduct({ _id: id });
		if (!deleted) throw Error('Cannot find product');

		res.status(200).json({
			code: 200,
			success: true,
			msg: 'Successfully deleted product',
		});
	} catch (error) {
		next(error)
	}
};
