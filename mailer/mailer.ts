import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAILACCOUNT,
		pass: process.env.GMAILAPPKEY,
	},
	from: process.env.GMAILACCOUNT,
});

export const sendMail = async (to: string, code: string): Promise<void> => {
	const mailOptions = {
		from: `"Facundo Kisser" ${process.env.GMAILACCOUNT}`,
		to,
		subject: "Código de verificación",
		text: `
      Llegó tu código de verificación.
      El código es ${code}
    `,
	};
	try {
		await transporter.sendMail(mailOptions);
		console.log("Correo electrónico enviado correctamente");
	} catch (error) {
		console.error("Error al enviar el correo electrónico", error);
	}
};
