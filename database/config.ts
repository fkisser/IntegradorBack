import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
	try {
		const dbURL = process.env.DB_URL;
		console.log(`La URI:${dbURL}`);
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
