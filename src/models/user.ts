import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const modelSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: 0,
			enum: [0, 1], // 0=admin, 1=super_admin
		},
	},
	{
		collection: 'user',
		timestamps: true,
	}
);

export const User = mongoose.model('user', modelSchema);
