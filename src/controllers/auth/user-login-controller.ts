import { IReq } from '@/helpers/ts-types';
import { getUser } from '@/helpers/user';
import { createHash, createToken } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const userLoginController = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	const body = req.body;

	try {
		const user = await getUser({ email: body.email });
		if (!user) throw Error('Invalid credentials!');

		const hashedPassword = await createHash(body.password);
		if (hashedPassword != user.password) throw Error('Invalid credentials!');

		const userObject = user.toObject() as Record<string, any>;
		delete userObject?.password;

		const token = createToken(userObject);

		res.json({
			success: true,
			msg: 'Successfully logged in',
			data: {
				token,
				user: userObject,
			},
		});
	} catch (error) {
		next(error);
	}
};
