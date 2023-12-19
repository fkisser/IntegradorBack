import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	const { admin } = req.body.user;

	if (!admin) {
		res.status(401).json({
			msg: "El usuario no es administrador",
		});
		return;
	}

	next();
};
