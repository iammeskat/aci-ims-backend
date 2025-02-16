import { IReq } from '@/helpers/ts-types';
import { getUser } from '@/helpers/user';
import { validateSchema, validationErrRes } from '@/helpers/utils';
import { NextFunction, Response } from 'express';
import Joi from 'joi';

// common rules
const CR = {
	name: Joi.string()
		.pattern(/^[A-Za-z.\s]+$/)
		.min(4)
		.max(30)
		.required()
		.messages({
			'string.pattern.base':
				'Name must contain only alphabets, dots, and spaces.',
		}),
	email: Joi.string().email().required(),
	password: Joi.string()
		.min(8)
		.pattern(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
		)
		.required()
		.messages({
			'string.pattern.base':
				'Password must including uppercase, lowercase, number, and special character.',
		}),
	confirm_password: Joi.string()
		.valid(Joi.ref('password'))
		.required()
		.messages({
			'any.only': 'Passwords do not match.',
		}),
};

export const validateUser = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object(CR);

	validateSchema(schema, req.body, res, async () => {
		const existingUser = await getUser({ email: req.body.email });
		if (existingUser) {
			return res
				.status(400)
				.json(validationErrRes([{ message: 'Email is already in use' }]));
		}
		next();
	});
};

export const validateUserUpdate = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		name: Joi.string()
			.pattern(/^[A-Za-z.\s]+$/)
			.min(4)
			.max(30)
			.messages({
				'string.pattern.base':
					'Name must contain only alphabets, dots, and spaces.',
			}),
		email: Joi.string().email(),
	});

	validateSchema(schema, req.body, res, async () => {
		const existingUser = await getUser({
			email: req.body.email,
			_id: { $ne: req.params?.id },
		});
		if (existingUser) {
			return res
				.status(400)
				.json(validationErrRes([{ message: 'Email is already in use' }]));
		}
		next();
	});
};

export const validateLogin = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		email: CR.email,
		password: Joi.string().required(),
	});

	validateSchema(schema, req.body, res, next);
};


