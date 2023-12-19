import { Model, ObjectId, Schema, Types, model } from "mongoose";
import { IShippingDetails, ShippingDetailsSchema } from "./shippingDetails";
import { IProduct, ProductSchema } from "./product";

interface IItem {
	product: ObjectId;
	quantity: number;
}

const ItemSchema = new Schema<IItem>({
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

export interface IOrder {
	createdAt: Date;
	user: Types.ObjectId;
	price: number;
	shippingCost: number;
	items: IItem[];
	shippingDetails: IShippingDetails;
	status: string;
	total: number;
}

const OrderSchema = new Schema<IOrder>({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	shippingCost: {
		type: Number,
		required: true,
	},
	items: {
		type: [ProductSchema],
		required: true,
		default: undefined,
	},
	shippingDetails: {
		type: ShippingDetailsSchema,
		required: true,
		default: undefined,
	},
	status: {
		type: String,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
});

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
