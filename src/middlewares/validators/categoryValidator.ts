import { getCategory } from '@/helpers/category';
import { IReq } from '@/helpers/ts-types';
import { validateSchema, validationErrRes } from '@/helpers/utils';
import { NextFunction, Response } from 'express';
import Joi from 'joi';


export const validateCategory = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		title: Joi.string().max(56).required(),
	});

	validateSchema(schema, req.body, res, async () => {
		const existingCat = await getCategory({ title: req.body.title.toLowerCase() });
		if (existingCat) {
			return res
				.status(400)
				.json(validationErrRes(
					[{ message: `The category with name ${req.body.title} has already been created` }],
					"Category already added"
				));
		}
		next();
	});
};

export const validateUpdateCategory = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		title: Joi.string().max(56),
	});

	validateSchema(schema, req.body, res, async () => {
		const existingCat = await getCategory({
			title: req.body.title.toLowerCase(),
			_id: { $ne: req.params.id },
		});
		if (existingCat) {
			return res
				.status(400)
				.json(validationErrRes(
					[{ message: `The category with name ${req.body.title} has already exist` }],
					"Category already exist"
				));
		}
		next();
	});
};

export const validateListCategory = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		page: Joi.number().integer().min(1).default(1),
		count: Joi.number().integer().min(1).max(100).default(10),
		search: Joi.string().trim().optional(),
		with_product: Joi.boolean(),
		product_count: Joi.number().integer().min(1).max(20).default(10),
	});

	validateSchema(schema, req.query, res, next);
};



