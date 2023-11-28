import { Router } from "express";
import { login, register, verifyUser } from "../controllers/auth";
import { check } from "express-validator";
import { errorsCollector } from "../middlewares/errorsCollector";
import { existingMail } from "../helpers/dbValidators";

const router = Router();

router.post(
	"/register",
	[
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("mail", "El correo electrónico es obligatorio").not().isEmpty(),
		check("mail", "El correo electrónico no es válido").isEmail(),
		check(
			"password",
			"La contraseña debe tener al menos 6 caracteres"
		).isLength({ min: 6 }),
		check("mail").custom(existingMail),
		errorsCollector,
	],
	register
);

router.post(
	"/login",
	[
		check("mail", "El correo electrónico no es válido").isEmail(),
		check("mail", "El correo electrónico es obligatorio").not().isEmpty(),
		check(
			"password",
			"La contraseña debe tener al menos 6 caracteres"
		).isLength({ min: 6 }),
		errorsCollector,
	],
	login
);

router.patch(
	"/verify",
	[
		check("mail", "El correo electrónico no es válido").isEmail(),
		check("mail", "El correo electrónico es obligatorio").not().isEmpty(),
		check("code", "El código de verificación es obligatorio").not().isEmpty(),
		errorsCollector,
	],
	verifyUser
);

export default router;
