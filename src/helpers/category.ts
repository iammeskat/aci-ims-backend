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
	with_product,
	product_count = 10,
}: TGetList) => {
	const query: IAnyObj = {};
	if (search) query["$text"] = { $search: search };

	const total = await Category.countDocuments(query);

	const results = await Category.aggregate([
		{ $match: query },

		...(with_product ? [{
			$lookup: {
				from: 'product',
				localField: '_id',
				foreignField: 'category',
				as: 'products',
			},
		},
		{
			$addFields: {
				products: { $slice: ['$products', product_count] },
			},
		}] : []),

		{ $sort: { is_super: -1, createdAt: -1 } },
		{ $skip: offset },
		{ $limit: limit },
	]);


	const pagination = getPagination({ currentPage, offset, limit, total })
	return {
		results,
		total,
		...pagination,
	};

}
