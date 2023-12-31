import express, { Express } from "express";
import cors from "cors";
import mainRoutes from "../routes/main";
import authRoutes from "../routes/auth";
import productRoutes from "../routes/product";
import categoryRoutes from "../routes/category";
import orderRoutes from "../routes/order";
import { dbConnection } from "../database/config";

export class Server {
	app: Express;
	port: string | number | undefined;
	mainPath: string;
	authPath: string;
	productPath: string;
	categoryPath: string;
	orderPath: string;
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.authPath = "/auth";
		this.productPath = "/products";
		this.categoryPath = "/categories";
		this.orderPath = "/orders";
		this.mainPath = "/";

		this.dbConnect();
		this.middlewares();
		this.routes();
	}

	async dbConnect(): Promise<void> {
		await dbConnection();
	}
	middlewares(): void {
		this.app.use(express.json());
		this.app.use(cors());
	}

	routes(): void {
		this.app.use(this.mainPath, mainRoutes);
		this.app.use(this.authPath, authRoutes);
		this.app.use(this.productPath, productRoutes);
		this.app.use(this.categoryPath, categoryRoutes);
		this.app.use(this.orderPath, orderRoutes);
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log(`Corriendo en puerto ${this.port}`);
		});
	}
}
