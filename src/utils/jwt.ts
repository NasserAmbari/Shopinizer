import { Types } from "mongoose";
import { User } from "../models/UserModel";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "secret";

export interface IUserToken
	extends Omit<
		User,
		| "password"
		| "activationCode"
		| "isActive"
		| "email"
		| "fullName"
		| "profilePicture"
		| "username"
	> {
	id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken): string => {
	const token = jwt.sign(user, SECRET, {
		expiresIn: "1h",
	});
	return token;
};
export const getUserData = (token: string) => {
	const user = jwt.verify(token, SECRET) as IUserToken;
	return user;
};
