import { NextFunction, Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import Category from "../models/category";

export const productValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title, desc, category, price, starred, url } = req.body;
	if (title) {
		const productTitle: IProduct | null = await Product.findOne({
			title: title.trim(),
		});
		if (productTitle) {
			res.status(400).json({
				msg: "Ya existe un producto con ese título",
			});
			return;
		}
	}
	if (desc) {
		if (desc.trim().length < 20) {
			res.status(400).json({
				msg: "La descripción debe tener al menos 20 caracteres",
			});
			return;
		}
	}
	if (price) {
		if (typeof price !== "number" || price <= 0) {
			res.status(400).json({
				msg: "El precio debe ser un número mayor a 0",
			});
			return;
		}
	}
	if (category) {
		const categoryId = await Category.findOne({
			code: category.trim(),
		});
		if (!categoryId) {
			res.status(404).json({
				msg: "No existe ninguna categoría con ese código",
			});
			return;
		}
	}
	if (typeof starred !== "boolean" && typeof starred !== "undefined") {
		res.status(404).json({
			msg: "Se esperaba un valor de tipo booleano",
		});
		return;
	}
	if (url && typeof url !== "string") {
		res.status(404).json({
			msg: "Se esperaba una cadena de caracteres",
		});
		return;
	}

	next();
};
