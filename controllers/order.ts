import { Request, Response } from "express";
import Order, { IOrder } from "../models/order";
import { SHIPPING_COST } from "../helpers/order";

export const getAllFromUser = async (req: Request, res: Response) => {
	const user = req.body.user;
	const orders: IOrder[] = await Order.find({ user: user._id })
		.populate("user")
		.populate({
			path: "items",
			populate: {
				path: "product",
				model: "Product",
			},
		});

	res.status(200).json({
		user,
		orders,
	});
	return;
};
export const getOneById = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const order: IOrder | null = await Order.findById(ID)
		.populate("user")
		.populate({
			path: "items",
			populate: {
				path: "product",
				model: "Product",
			},
		});
	if (!order) {
		res.status(404).json({
			msj: "La orden no existe",
		});
		return;
	}
	res.status(200).json({
		order,
	});
	return;
};
export const getOrdersByStatus = async (req: Request, res: Response) => {
	const { STATUS } = req.params;
	const orders: IOrder[] = await Order.find({ status: STATUS })
		.populate("user")
		.populate({
			path: "items",
			populate: {
				path: "product",
				model: "Product",
			},
		});
	if (!orders.length) {
		res.status(404).json({
			msj: "No existen órdenes con este estado para este usuario",
		});
		return;
	}
	res.status(200).json({
		orders,
	});
	return;
};
export const createOrder = async (req: Request, res: Response) => {
	const { _id } = req.body.user;
	const { items, shippingDetails, price }: IOrder = req.body;
	const shippingCost = SHIPPING_COST;
	const total = price + shippingCost;
	const orderData: IOrder = {
		createdAt: new Date(),
		user: _id,
		price,
		items,
		shippingDetails,
		status: "pending",
		total,
	};
	const order = new Order(orderData);
	await order.save();

	res.status(201).json({
		msg: "Orden creada con éxito",
		order: order,
	});
	return;
};

export const updateOrder = async (req: Request, res: Response) => {
	const { _id } = req.body.user;
	const { ID } = req.params;
	const { items, shippingDetails, price }: IOrder = req.body;
	const shippingCost = SHIPPING_COST;
	const total = price + shippingCost;
	let order = await Order.findById(ID);
	if (!order) {
		res.status(404).json({
			msg: "La orden no existe",
		});
		return;
	}
	if (order?.status !== "pending") {
		res.status(403).json({
			msg: "La orden solo puede modificarse si se encuentra en estado pendiente",
			order: order,
		});
		return;
	}
	if (order?.user._id.toString() !== _id.toString()) {
		res.status(403).json({
			msg: "La orden solo puede modificarse por el usuario/a que la creó",
		});
		return;
	}
	const orderData: IOrder = {
		createdAt: new Date(),
		user: _id,
		price,
		items,
		shippingDetails,
		status: "pending",
		total,
	};
	let updOrder = await Order.findByIdAndUpdate(ID, orderData, { new: true });
	res.status(200).json({
		msg: "Orden modificada con éxito",
		order: updOrder,
	});
	return;
};

export const deleteOrder = async (req: Request, res: Response) => {
	const { _id } = req.body.user;
	const { ID } = req.params;
	let order = await Order.findById(ID);
	if (!order) {
		res.status(404).json({
			msg: "La orden no existe",
		});
		return;
	}
	if (order?.status !== "pending") {
		res.status(403).json({
			msg: "La orden solo puede eliminarse si se encuentra en estado pendiente, contáctese con una sucursal",
			order: order,
		});
		return;
	}
	if (order?.user._id.toString() !== _id.toString()) {
		res.status(403).json({
			msg: "La orden solo puede eliminarse por el usuario/a que la creó",
		});
		return;
	}
	await Order.findByIdAndDelete(ID);
	res.status(200).json({
		msg: "Orden eliminada con éxito",
		order,
	});
	return;
};
