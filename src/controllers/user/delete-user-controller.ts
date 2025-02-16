import { IReq } from '@/helpers/ts-types';
import { deleteUser } from '@/helpers/user';
import { verifyObjId } from '@/helpers/utils';
import { NextFunction, Response } from 'express';

export const deleteUserController = async (req: IReq, res: Response, next: NextFunction) => {
	const id = req.params.id;
	try {
		verifyObjId(id);

		const deleted = await deleteUser({ _id: id, role: { $ne: 1 }, });
		if (!deleted) throw Error('Unable to delete');

		res.status(200).json({
			code: 200,
			success: true,
			msg: 'Successfully deleted user',
		});
	} catch (error) {
		next(error)
	}
};
