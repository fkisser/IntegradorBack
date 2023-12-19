import { Schema, model, Model, ObjectId } from "mongoose";

export interface ICategory {
	title: string;
	code: string;
}

const CategorySchema = new Schema<ICategory>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
});

const Category: Model<ICategory> = model<ICategory>("Category", CategorySchema);

export default Category;
