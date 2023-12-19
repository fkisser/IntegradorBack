import { Schema } from "mongoose";

export interface IShippingDetails {
	name: string;
	lname: string;
	mail: string;
	dni: number;
	address: string;
	details: string;
}

export const ShippingDetailsSchema = new Schema<IShippingDetails>({
	name: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	mail: {
		type: String,
		required: true,
	},
	dni: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	details: {
		type: String,
		required: false,
	},
});
