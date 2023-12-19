import { Model, ObjectId, Schema, model } from "mongoose";

export interface IProduct {
	title: string;
	desc: string;
	category: ObjectId;
	price: number;
	starred: boolean;
	url: string;
}

export const ProductSchema = new Schema<IProduct>({
	title: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
	},
	price: {
		type: Number,
		required: true,
	},
	starred: {
		type: Boolean,
		required: false,
		default: false,
	},
	url: {
		type: String,
		required: true,
	},
});

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
