import { Model, Schema, model } from "mongoose";

export interface IUser {
	name: string;
	mail: string;
	password: string;
	admin: boolean;
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
	admin: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, password, admin, _id, ...user } = this.toObject();
	return user;
};

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User;
