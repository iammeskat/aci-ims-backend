import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const modelSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true
		},
		is_super: {
			type: Boolean,
			default: false,
		},
	},
	{
		collection: 'category',
		timestamps: true,
	}
);

export const Category = mongoose.model('category', modelSchema);
