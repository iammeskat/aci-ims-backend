import { updateProduct } from '@/helpers/product';
import { IReq } from '@/helpers/ts-types';
import { NextFunction, Response } from 'express';

export const updateProductController = async (req: IReq, res: Response, next: NextFunction) => {
	const id = req.params.id;
	const body = req.body;

	try {
		const updatedProduct = await updateProduct({ _id: id }, body);
		if (!updatedProduct) throw Error("Product not found")

		res.status(200).json({
			code: 200,
			success: true,
			msg: 'Successfully updated category',
			data: updatedProduct,
		});
	} catch (error) {
		next(error)
	}
};
