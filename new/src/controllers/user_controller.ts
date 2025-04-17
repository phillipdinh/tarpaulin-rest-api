import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import {
	createUser,
	findUserByEmail,
	findUserByID,
} from "../models/user_models.js";

import { invalidRoleMessage } from "../middleware/auth.middleware.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export async function registerStudent(req: Request, res: Response) {
	if (req.body.role == "student") {
		try {
			const plainPassword = req.body.password;
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
			req.body.password = hashedPassword;

			const id = await createUser(req.body);
			res.status(201).json({ id: id });
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
		res.status(201).json(req.user);
	}
}

// TODO: admin only
export async function registerInstructor(req: Request, res: Response) {
	if (req.user && req.user.role == "admin") {
		try {
			const id = await createUser(req.body);

			res.status(201).json({ id: id });
		} catch (err: any) {
			res.status(400).json({ error: err.message });
		}
		res.status(201).json(req.user);
	} else {
		res.status(403).json(invalidRoleMessage);
	}
}

export async function userLogin(req: Request, res: Response) {
	try {
		const { email, password } = req.body;

		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Use bcrypt to compare passwords
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (isPasswordValid) {
			// Generate JWT token
			const token = jwt.sign(
				{ userID: user.id, email: user.email },
				SECRET_KEY,
				{ expiresIn: "1h" }
			);

			return res.status(200).json({
				message: "Login successful",
				token,
			});
		} else {
			return res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (err: any) {
		res.status(500).json({ error: err });
	}
}

// TODO: Courses

export async function getUserInfo(req: Request, res: Response) {
	if (req.params.id == req.user.id) {
		const id = Number(req.params.id);
		console.log("Request received for ID:", id);

		try {
			const user = await findUserByID(id);
			console.log(user);

			if (user) {
				if (user.role == "student") {
					res.status(200).json({
						id: user.id,
						name: user.name,
						email: user.email,
						role: user.role,
						courses: [],
					});
				}
				// else if (user.role == "instructor") {
				// 	const courses = await Course.findAll({
				// 		where: { instructorId: user.id },
				// 	});
				// 	res.status(200).json({
				// 		id: user.id,
				// 		name: user.name,
				// 		email: user.email,
				// 		role: user.role,
				// 		courses: courses,
				// 	});
				// }
				else {
					res.status(200).json(user);
				}
			} else {
				res.status(404).json({ error: "User not found" });
			}
		} catch (err) {
			res.status(500).json({ error: err });
		}
	} else {
		res.status(403).json(invalidRoleMessage);
	}
}
