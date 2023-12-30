import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import Category from "../models/category";

export const getAllProducts = async (req: Request, res: Response) => {
	const products: IProduct[] = await Product.find().populate("category");
	res.status(200).json({
		products,
	});
};
export const getProductsByCategory = async (req: Request, res: Response) => {
	const { CODE } = req.params;
	const categoryId = await Category.findOne({ code: CODE });
	if (!categoryId) {
		res.status(404).json({
			msg: "Código de categoría inválido",
		});
	}
	const products: IProduct[] = await Product.find({
		category: categoryId?._id,
	}).populate("category");
	res.status(200).json({
		products,
	});
};
export const getProductById = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const product = await Product.findOne({ _id: ID }).populate("category");
	if (!product) {
		res.status(404).json({
			msg: "Id de producto inválido",
		});
	}
	res.status(200).json({
		product,
	});
};

export const createProduct = async (req: Request, res: Response) => {
	const { title, desc, category, price, starred, url } = req.body;
	let categoryId;
	if (!category) {
		categoryId = await Category.findOne({
			code: "none",
		});
	} else {
		categoryId = await Category.findOne({
			code: category.trim(),
		});
	}
	const productData = new Product({
		title,
		desc,
		category: categoryId?._id,
		price,
		starred,
		url,
	});
	const product = new Product(productData);
	await product.save();
	res.status(201).json({
		msg: "Producto creado con éxito",
		product,
	});
};
export const updateProduct = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const { ...data } = req.body;
	const product = await Product.findByIdAndUpdate(
		ID,
		{ ...data },
		{
			new: true,
		}
	);
	if (!product) {
		res.status(404).json({
			msg: "Id de producto inválido",
		});
	}
	res.status(200).json({
		msg: "Producto actualizado con éxito",
		product,
	});
};
export const deleteProduct = async (req: Request, res: Response) => {
	const { ID } = req.params;
	const product = await Product.findByIdAndDelete(ID);
	if (!product) {
		res.status(404).json({
			msg: "Id de producto inválido",
		});
	}
	res.status(200).json({
		msg: "Producto eliminado con éxito",
		product,
	});
};
