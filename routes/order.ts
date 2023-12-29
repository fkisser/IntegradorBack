import { Router } from "express";
import {
	createOrder,
	deleteOrder,
	getAllFromUser,
	getOneById,
	updateOrder,
} from "../controllers/order";
import jwtValidator from "../middlewares/jwtValidator";
import { check } from "express-validator";
import { errorsCollector } from "../middlewares/errorsCollector";
import { orderValidator } from "../middlewares/orderValidator";
const router = Router();
router.get("/", [jwtValidator, errorsCollector], getAllFromUser);
router.get("/:ID", [jwtValidator, errorsCollector], getOneById);
router.post(
	"/",
	[
		jwtValidator,
		check("items", "Debe haber al menos un producto en la orden").isArray({
			min: 1,
		}),
		check("shippingDetails", "Los datos de envío son obligatorios")
			.not()
			.isEmpty(),
		check("price", "El precio es obligatorio").not().isEmpty(),
		orderValidator,
		errorsCollector,
	],
	createOrder
);
router.put(
	"/:ID",
	[
		jwtValidator,
		check("items", "Debe haber al menos un producto en la orden").isArray({
			min: 1,
		}),
		check("shippingDetails", "Los datos de envío son obligatorios")
			.not()
			.isEmpty(),
		check("price", "El precio es obligatorio").not().isEmpty(),
		orderValidator,
		errorsCollector,
	],
	updateOrder
);
router.delete("/:ID", [jwtValidator, errorsCollector], deleteOrder);

export default router;
