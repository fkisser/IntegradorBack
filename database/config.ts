import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
	try {
		const dbURL =
			"mongodb+srv://vercel-admin-user:q1rOI5Bhnqc5o5Ka@integrador.kzb8que.mongodb.net/test";
		console.log(dbURL);
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
