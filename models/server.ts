import express, { Express } from "express";
import cors from "cors";
import authRoutes from "../routes/auth";
import productRoutes from "../routes/product";
import categoryRoutes from "../routes/category";
import { dbConnection } from "../database/config";

export class Server {
	app: Express;
	port: string | number | undefined;
	authPath: string;
	productPath: string;
	categoryPath: string;
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.authPath = "/auth";
		this.productPath = "/products";
		this.categoryPath = "/categories";

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
		this.app.use(this.authPath, authRoutes);
		this.app.use(this.productPath, productRoutes);
		this.app.use(this.categoryPath, categoryRoutes);
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log(`Corriendo en puerto ${this.port}`);
		});
	}
}
