import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { sendMail } from "../mailer/mailer";
import { JWTgenerator } from "../helpers/JWTgenerator";

export const register = async (req: Request, res: Response) => {
	const { name, mail, password, role }: IUser = req.body;
	const user = new User({ name, mail, password, role });
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);
	const adminKey = req.headers["admin-key"];
	if (adminKey === process.env.ADMINKEY) {
		user.role = ROLES.admin;
	}
	user.code = randomstring.generate(6);
	await user.save();
	await sendMail(user.mail, user.code);
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

export const verifyUser = async (req: Request, res: Response) => {
	const { mail, code } = req.body;
	try {
		const user = await User.findOne({ mail });
		if (!user) {
			res.status(404).json({
				msg: "Este usuario no está registrado",
			});
			return;
		}
		if (user.verified) {
			res.status(400).json({
				msg: "Este usuario ya fue verificado anteriormente",
			});
			return;
		}
		if (code !== user.code) {
			res.status(401).json({
				msg: "El código ingresado no es correcto",
			});
			return;
		}
		await User.findOneAndUpdate({ mail }, { verified: true });
		res.status(200).json({
			msg: "Usuario verificado con éxito",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error en el servidor",
		});
	}
};
