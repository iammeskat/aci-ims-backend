import { getCategory } from '@/helpers/category';
import { createProduct, fetchProductData } from '@/helpers/product';
import { IReq } from '@/helpers/ts-types';
import { NextFunction, Response } from 'express';

export const addProductController = async (req: IReq, res: Response, next: NextFunction) => {
	const body = req.body;

	try {
		let newProduct = {};

		if (body.barcode) {
			const productData = await fetchProductData(body.barcode);
			const unCat = await getCategory({ is_super: true, title: "uncategorized" });
			if (!unCat) throw Error("Uncategorized category not found");
			newProduct = await createProduct({ ...productData, category: unCat._id });
		} else {
			newProduct = await createProduct(body);
		}

		res.status(201).json({
			code: 201,
			success: true,
			msg: 'Successfully added product.',
			data: newProduct,
		});
	} catch (error) {
		next(error)
	}
};
