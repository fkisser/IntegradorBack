import { Router } from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	getProductsByCategory,
	updateProduct,
	// deleteCategory,
	// getAllCategories,
	// getCategoryByCode,
	// updateCategory,
} from "../controllers/product";
import { check } from "express-validator";
import { errorsCollector } from "../middlewares/errorsCollector";
import jwtValidator from "../middlewares/jwtValidator";
import { isAdmin } from "../middlewares/roleValidator";
import { productValidator } from "../middlewares/productValidator";

const router = Router();

router.post(
	"/",
	[
		jwtValidator,
		isAdmin,
		check("title", "El título es obligatorio").not().isEmpty(),
		check("desc", "La descripción es obligatoria").not().isEmpty(),
		check("price", "El precio es obligatorio").not().isEmpty(),
		productValidator,
		errorsCollector,
	],
	createProduct
);
router.patch(
	"/product/:ID",
	[jwtValidator, isAdmin, productValidator, errorsCollector],
	updateProduct
);
router.delete(
	"/product/:ID",
	[jwtValidator, isAdmin, errorsCollector],
	deleteProduct
);
router.get("/", getAllProducts);
router.get("/category/:CODE", getProductsByCategory);
router.get("/product/:ID", getProductById);
// router.get("/:CODE", getCategoryByCode);
// router.put("/:CODE", updateCategory);
// router.patch("/:CODE", updateCategory);
// router.delete("/:CODE", deleteCategory);

export default router;
