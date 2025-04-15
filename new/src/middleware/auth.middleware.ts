// middleware/auth.middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { findUserByID } from "../models/user_models.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

interface JwtPayload {
	userID: number;
	email: string;
}

export async function authenticateToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer <token>'

	try {
		if (!token) {
			return res.status(401).json({ error: "No token provided" });
		}

		const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

		const user = await findUserByID(decoded.userID);
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({
			error: "Invalid authentication token.",
			msg: err,
		});
	}
}

export const invalidRoleMessage = {
	error: "Unauthorized to access this resource",
};
