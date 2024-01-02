import { NextFunction, Request, Response } from "express";
import { IItem } from "../models/order";
import Product, { IProduct } from "../models/product";

export const orderValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { items, shippingDetails, price } = req.body;
	if (items) {
		items.forEach(async (item: IItem) => {
			const product: IProduct | null = await Product.findById(item.product);
			if (!product) {
				res.status(404).json({
					msg: `Hay un producto de la orden que ya no existe, contacte con el proveedor para solucionarlo`,
				});
				return;
			}
		});
	}
	if (shippingDetails) {
		const { name, lname, mail, dni, address } = shippingDetails;
		if (!name || !lname || !mail || !dni || !address) {
			res.status(400).json({
				msg: `Asegúrese de haber ingresado todos los campos obligatorios para el envío`,
			});
			return;
		}
		if (address.split(",").length < 3) {
			res.status(400).json({
				msg: `Asegúrese de que la dirección tenga un formato como el siguiente: "Calle Falsa 123, Paraná, Entre Ríos, Argentina, CP3100"`,
			});
			return;
		}
	}
	if (price <= 0) {
		res.status(400).json({
			msg: `El precio de los productos debe ser mayor a 0 (cero)`,
		});
		return;
	}

	next();
};
