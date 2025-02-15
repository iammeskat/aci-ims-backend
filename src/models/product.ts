import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const modelSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			default: null
		},
		material: {
			type: Number,
			required: true,
		},
		barcode: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			text: true,
			default: null,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "category",
			required: true,
		},
		category_updated_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: 'product',
		timestamps: true,
	}
);

modelSchema.pre('findOneAndUpdate', function (next) {
	const update = this.getUpdate() as mongoose.UpdateQuery<any>;

	if (update.category) {
		this.setUpdate({
			...update,
			category_updated_at: new Date(),
		});
	}
	next();
});


export const Product = mongoose.model('product', modelSchema);


