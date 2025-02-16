import { User } from '@/models';
import { IAnyObj, TGetList } from './ts-types';
import { getPagination } from './utils';

export const createUser = async (body: object) => {
	const doc = new User(body);
	await doc.save();
	const userObject: any = doc.toObject();
	delete userObject.password;
	delete userObject.__v;
	delete userObject.createdAt;
	delete userObject.updatedAt;

	return userObject;
};

export const getUser = async (
	filter: object,
	projection?: string,
	options?: object
) => {
	let doc = await User.findOne(filter, projection, options);
	return doc;
};

export const deleteUser = async (filter: object) => {
	let doc = await User.findOneAndDelete(filter);
	return doc;
};

export const updateUser = async (filter: object, body: object) => {
	let doc = await User.findOneAndUpdate(filter, body, { new: true });
	return doc;
};

export const getListUser = async ({
	limit,
	offset,
	currentPage,
	search,
}: TGetList) => {
	const query: IAnyObj = {};
	if (search) query['$text'] = { $search: search };

	const total = await User.countDocuments(query);

	const results = await User.find(query, "-password")
		.skip(offset)
		.limit(limit)
		.sort({ createdAt: -1 });

	const pagination = getPagination({ currentPage, offset, limit, total });
	return {
		results,
		...pagination,
	};
};
