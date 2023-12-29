import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
	try {
		// const dbURL = process.env.DB_URL;
		let dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWRD}@${process.env.DB_PROJECT}.mongodb.net/${process.env.DB_COLLECTION}`;
		if (!dbURL) {
			throw new Error(
				"La URL de la DB no está correctamente definida en las variables de entorno"
			);
		}
		await mongoose.connect(dbURL);
		console.log("BDD conectada");
	} catch (error) {
		console.log(error);
		throw new Error("Error al momento de iniciar la DB");
	}
};
