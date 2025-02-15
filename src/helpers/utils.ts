import crypto from 'crypto';
import { NextFunction, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { isValidObjectId } from 'mongoose';
import {
	IParsedQs,
	TJsonResBody,
	TPagination,
	TPayloadValidator,
	TValidationErrorItem,
} from './ts-types';

export const payloadValidator = ({
	payload = {},
	validKeys = [],
	mustKeys = [],
	prefix = '',
}: TPayloadValidator) => {
	let keys = Object.keys(payload) || [];
	if (keys.length > validKeys.length + mustKeys.length) {
		throw Error('Unexpected key in body');
	}

	for (let i = 0; i < keys.length; i++) {
		const key: string = keys[i];
		if (!validKeys.includes(key) && !mustKeys.includes(key)) {
			throw Error(`Unexpected key: ${prefix + key} in body`);
		}
	}

	for (let i = 0; i < mustKeys.length; i++) {
		const key = mustKeys[i];
		if (!keys.includes(key)) {
			throw Error(`Missing field: ${prefix + key}`);
		}
	}

	return null;
};

export const getFilters = (query: IParsedQs): TPagination => {
	const page = Number(query.page) || 1;
	const count = Number(query.count) || 10;
	const offset = (page - 1) * count;
	const search = query.search ? String(query.search).trim() : null;

	return { page, count, offset, search };
};

export const getPagination = ({
	currentPage,
	offset,
	limit,
	total,
}: {
	currentPage: number;
	offset: number;
	limit: number;
	total: number;
}): Object => {
	const last_page = Math.ceil(total / limit);
	return {
		first_page: currentPage === 1 ? null : 1,
		previous: currentPage === 1 ? null : currentPage - 1,
		next: offset + limit >= total ? null : currentPage + 1,
		last_page: last_page === currentPage ? null : last_page,
	};
};

export const verifyObjId = (id: string, key?: string) => {
	if (!isValidObjectId(id))
		throw Error(key ? `Invalid ${key} ID` : 'Invalid object ID');
	return true;
};

export const createHash = async (plainText: string) => {
	const salt = process.env.CRYPTO_SALT || '';
	const hash = crypto.createHmac('sha1', salt).update(plainText).digest('hex');
	return hash;
};

export const createToken = (data: object): string => {
	const token = jwt.sign(data, process.env.JWT_SECRET || '', {
		expiresIn: '7d',
	});
	return token;
};

export const isValidEmail = (email: string) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

export const getErrorMsg = (error: any) =>
	error instanceof Error ? error.message : 'An unknown error occurred.';

export const validationErrRes = (errors: TValidationErrorItem[], msg?: string) => ({
	success: false,
	msg: msg || 'The provided input data is invalid',
	errors: errors.map((err) => err.message),
});

export const validateSchema = (
	schema: Joi.ObjectSchema,
	payload: IParsedQs,
	res: Response,
	next: NextFunction
) => {
	const { error } = schema.validate(payload, { abortEarly: false });
	if (error) return res.status(400).json(validationErrRes(error.details));
	next();
};

export const jsonRes = (res: Response, data: TJsonResBody, status = 200) => {
	res.status(status).json(data);
};
