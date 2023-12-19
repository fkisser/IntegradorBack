import jwt from "jsonwebtoken";

export const JWTgenerator = (id: string = ""): Promise<string> => {
	return new Promise((res, rej) => {
		const payload = { id };

		jwt.sign(
			payload,
			process.env.TOKENKEY as string,
			// { expiresIn: "4h" },
			(err: Error | null, token: string | undefined) => {
				if (err) {
					console.log(err);
					rej("No pudo generarse el JWT");
				} else {
					res(token as string);
				}
			}
		);
	});
};
