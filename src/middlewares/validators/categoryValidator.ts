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

	validateSchema(schema, req, res, async () => {
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


