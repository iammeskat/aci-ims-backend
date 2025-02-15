import { getProduct } from '@/helpers/product';
import { IReq } from '@/helpers/ts-types';
import { validateSchema, validationErrRes } from '@/helpers/utils';
import { NextFunction, Response } from 'express';
import Joi from 'joi';


export const validateProduct = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string(),
		category: Joi.string(),
	});

	validateSchema(schema, req, res, next);
};

export const validateUpdateProduct = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		title: Joi.string(),
		description: Joi.string(),
		category: Joi.string(),
	});

	validateSchema(schema, req, res, next);
};


export const validateBarcode = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		barcode: Joi.string().length(13).required(),
	});

	validateSchema(schema, req, res, async () => {
		const existingProduct = await getProduct({ barcode: req.body.barcode });
		if (existingProduct) {
			return res
				.status(400)
				.json(validationErrRes(
					[{ message: `The product with barcode ${req.body.barcode} has already been added. Please check your inventory before adding it again.` }],
					"Product already added"
				));
		}
		next();
	});
};


