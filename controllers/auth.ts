import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { JWTgenerator } from "../helpers/JWTgenerator";

export const register = async (req: Request, res: Response) => {
	const { name, mail, password }: IUser = req.body;
	const user = new User({ name, mail, password });
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);
	await user.save();
	res.status(201).json({
		user,
	});
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { mail, password }: IUser = req.body;
	try {
		const user = await User.findOne({ mail });
		if (!user) {
			res.status(404).json({
				msg: "Este usuario no está registrado",
			});
			return;
		}
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			res.status(401).json({
				msg: "Contraseña incorrecta",
			});
			return;
		}
		const token = await JWTgenerator(user.id);
		res.status(202).json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error en el servidor",
		});
	}
};
