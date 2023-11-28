import { sendMail } from "../mailer/mailer";
import User, { IUser } from "../models/user";

export const existingMail = async (mail: string): Promise<void> => {
	const user: IUser | null = await User.findOne({ mail });
	if (user && user.verified)
		throw new Error(`El correo electrónico ${mail} ya está registrado`);
	if (user && !user.verified) {
		await sendMail(mail, user.code as string);
		throw new Error(
			`El correo electrónico ${mail} ya está registrado. Se envió nuevamente el código de verificación`
		);
	}
};
