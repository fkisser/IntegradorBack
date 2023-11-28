import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
	name: string;
	mail: string;
	password: string;
	role?: string;
	code?: string;
	verified?: string;
}

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, "El nombre es obligatorio"],
	},
	mail: {
		type: String,
		required: [true, "El correo electrónico es obligatorio"],
	},
	password: {
		type: String,
		required: [true, "La contraseña es obligatoria"],
	},
	role: {
		type: String,
		default: ROLES.user,
	},
	code: {
		type: String,
	},
	verified: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, code, ...user } = this.toObject();
	return user;
};

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
