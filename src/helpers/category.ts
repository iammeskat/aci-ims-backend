import { Category } from '@/models';
import { IAnyObj, TGetList } from './ts-types';
import { getPagination } from './utils';

export const createCategory = async (body: object) => {
	let doc = new Category(body);
	await doc.save();

	return doc;
};

export const getCategory = async (
	filter: object,
	projection?: string,
	options?: object
) => {
	let doc = await Category.findOne(filter, projection, options);
	return doc;
};

export const deleteCategory = async (filter: object) => {
	let doc = await Category.findOneAndDelete(filter);
	return doc;
};

export const updateCategory = async (filter: object, body: object) => {
	let doc = await Category.findOneAndUpdate(filter, body, { new: true });
	return doc;
};

export const getListCategory = async ({
	limit,
	offset,
	currentPage,
	search,
}: TGetList) => {
	const query: IAnyObj = {};
	if (search) query['$text'] = { $search: search };

	const total = await Category.countDocuments(query);

	const results = await Category.find(query)
		.skip(offset)
		.limit(limit)
		.sort({ createdAt: -1 });

	const pagination = getPagination({ currentPage, offset, limit, total });
	return {
		results,
		total,
		...pagination,
	};
};
