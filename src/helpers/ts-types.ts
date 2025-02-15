import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IReq extends Request {
	user?: {
		_id: string;
		role: number;
	};
	is_super?: boolean;
}
export interface IAuthReq extends Request {
	user: {
		_id: string;
		role: number;
	};
	is_admin: boolean;
}

export interface IAuthPayload extends JwtPayload {
	_id: string;
	role: number;
}

export type TGetList = {
	limit: number;
	offset: number;
	currentPage: number;
	search?: string | null;
	[key: string]: any;
};

export type TPayloadValidator = {
	payload: object;
	validKeys?: string[];
	mustKeys?: string[];
	prefix?: string;
};

export type TPagination = {
	page: number;
	count: number;
	offset: number;
	search?: string | null;
};

export interface IAnyObj {
	[key: string]: any;
}

export interface IParsedQs {
	[key: string]: undefined | string | IParsedQs | (string | IParsedQs)[];
}

export interface TValidationErrorItem {
	message: string;
	[key: string]: any;
}

export type TJsonResBody = {
	success: boolean;
	msg: string;
	data?: any | IAnyObj;
};
