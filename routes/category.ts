import { Router } from "express";
import { check } from "express-validator";
import { errorsCollector } from "../middlewares/errorsCollector";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategoryByCode,
	updateCategory,
} from "../controllers/category";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";

const router = Router();

router.get("/", [], getAllCategories);
router.get("/:CODE", getCategoryByCode);
router.post(
	"/",
	[
		jwtValidator,
		isAdmin,
		check("title", "El título es obligatorio").not().isEmpty(),
		check("title", "El título debe contener entre 3 y 25 caracteres").isLength({
			min: 3,
			max: 25,
		}),
		check("code", "El código es obligatorio").not().isEmpty(),
		errorsCollector,
	],
	createCategory
);
router.patch(
	"/:CODE",
	[
		jwtValidator,
		isAdmin,
		check("title", "El título es obligatorio").not().isEmpty(),
		check("title", "El título debe contener entre 3 y 25 caracteres").isLength({
			min: 3,
			max: 25,
		}),
		errorsCollector,
	],
	updateCategory
);

router.delete(
	"/:CODE",
	[jwtValidator, isAdmin, errorsCollector],
	deleteCategory
);
export default router;
