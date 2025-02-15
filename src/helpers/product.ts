import { Product } from '@/models';
import { IAnyObj, TGetList } from './ts-types';
import { getPagination } from './utils';

export const createProduct = async (body: object) => {
	let doc = new Product(body);
	await doc.save();

	return doc;
};

export const getProduct = async (
	filter: object,
	projection?: string,
	options?: object
) => {
	let doc = await Product.findOne(filter, projection, options);
	return doc;
};

export const deleteProduct = async (filter: object) => {
	let doc = await Product.findOneAndDelete(filter);
	return doc;
};

export const updateProduct = async (filter: object, body: object) => {
	let doc = await Product.findOneAndUpdate(filter, body, { new: true });
	return doc;
};

export const getListProduct = async ({
	limit,
	offset,
	currentPage,
	search,
}: TGetList) => {
	const query: IAnyObj = {};
	if (search) query['$text'] = { $search: search };

	const total = await Product.countDocuments(query);

	const results = await Product.find(query)
		.populate("category", "_id title")
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

export const fetchProductData = async (barcode: string) => {
	const res = await fetch(`https://products-test-aci.onrender.com/product/${barcode}`);
	const jsonData = await res.json();
	if (!jsonData.status)
		throw Error(jsonData.error)
	return jsonData.product;
}
