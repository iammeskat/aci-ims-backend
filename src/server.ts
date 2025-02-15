import dotenv from 'dotenv';
import mongoose from 'mongoose';
import 'tsconfig-paths/register';
import app from './app';

dotenv.config();

const mongoURI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

mongoose
	.connect(mongoURI)
	.then(() => console.log('MongoDB connected successfully'))
	.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
