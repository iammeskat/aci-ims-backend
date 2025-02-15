import { IReq } from '@/helpers/ts-types';
import { createUser } from '@/helpers/user';
import { createHash } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const addUserController = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const body = req.body;

	try {
		const hashedPassword = await createHash(body.password);
		if (!hashedPassword) throw Error('Something went wrong');

		const newUser = await createUser({
			...body,
			password: hashedPassword,
		});

		res.status(201).json({
			success: true,
			data: newUser,
			msg: 'Successfully created user',
		});
	} catch (error) {
		next(error);
	}
};
