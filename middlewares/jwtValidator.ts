import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario, { IUser } from "../models/user";

const jwtValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers["x-token"] as string;

	if (!token) {
		res.status(401).json({
			msg: "No hay token en la peticion",
		});
		return;
	}

	try {
		const tokenKey = process.env.TOKENKEY as string;
		const payload = jwt.verify(token, tokenKey) as JwtPayload;

		const { id } = payload;

		const user: IUser | null = await Usuario.findById(id);

		if (!user) {
			res.status(404).json({
				msg: "El usuario no se ha encontrado en la DB",
			});
			return;
		}

		req.body.user = user;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "Token no válido",
		});
	}
};

export default jwtValidator;
