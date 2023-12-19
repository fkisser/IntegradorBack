import User, { IUser } from "../models/user";

export const existingMail = async (mail: string): Promise<void> => {
	const user: IUser | null = await User.findOne({ mail });
	if (user) throw new Error(`El correo electrónico ${mail} ya está registrado`);
};
