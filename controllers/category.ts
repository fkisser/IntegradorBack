import { Request, Response } from "express";
import Category, { ICategory } from "../models/category";
import Product from "../models/product";

export const getAllCategories = async (req: Request, res: Response) => {
	const categories: ICategory[] = await Category.find();
	res.status(200).json({ categories });
	return;
};
export const getCategoryByCode = async (req: Request, res: Response) => {
	const { CODE } = req.params;
	const category: ICategory | null = await Category.findOne({ code: CODE });
	category
		? res.status(200).json({
				category,
		  })
		: res.status(404).json({
				msj: "No existe ninguna categoría con ese código",
		  });
};

export const createCategory = async (req: Request, res: Response) => {
	const categoryData: ICategory = req.body;
	const category = new Category(categoryData);
	const categoryTitle: ICategory | null = await Category.findOne({
		title: category.title.trim(),
	});
	if (categoryTitle) {
		res.status(403).json({
			msg: "Ya existe una categoría con ese nombre",
		});
		return;
	}
	const categoryCode = await Category.findOne({ code: category.code });
	if (categoryCode) {
		res.status(403).json({
			msg: "Ya existe una categoría con ese código",
		});
		return;
	}
	await category.save();

	res.status(201).json({
		msg: "Categoría creada con éxito",
		category,
	});
	return;
};
export const updateCategory = async (req: Request, res: Response) => {
	const { CODE } = req.params;
	const { title } = req.body;
	const categoryTitle: ICategory | null = await Category.findOne({
		title,
	});
	if (categoryTitle) {
		res.status(403).json({
			msg: "Ya existe una categoría con ese título",
		});
		return;
	}

	const category = await Category.findOneAndUpdate(
		{ code: CODE },
		{ title: title },
		{
			new: true,
		}
	);

	res.status(200).json({
		msg: "Categoría modificada con éxito",
		category,
	});
	return;
};
export const deleteCategory = async (req: Request, res: Response) => {
	const { CODE } = req.params;
	const categoryId = await Category.findOne({ code: CODE });
	if (!categoryId) {
		res.status(404).json({
			msg: "Código de categoría inválido",
		});
		return;
	}
	const products = await Product.find({ category: categoryId?._id });
	if (products) {
		const categoryNone = await Category.findOne({ code: "" });
		products?.forEach(async (product) => {
			await Product.findByIdAndUpdate(product._id, {
				category: categoryNone?._id,
			});
		});
	}
	const category = await Category.findOneAndDelete({ code: CODE });
	res.status(200).json({
		msg: "Categoría eliminada con éxito. Los productos que estaban en esta categoría, se trasladaron a la categoría 'Todos', reasígnelos a otra categoría",
		category,
		products,
	});
	return;
};
