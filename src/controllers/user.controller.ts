import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import {
	insertUser,
	findUserByEmail,
	findUserByID,
	findCoursesByStudentID,
} from "../models/user.models.js";

import { findCoursesByInstructorID } from "../models/course.models.js";

import { invalidRoleMessage } from "../middleware/auth.middleware.js";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export async function userLogin(req: Request, res: Response) {
	try {
		const { email, password } = req.body;

		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Use bcrypt to compare passwords
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

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
	} catch (err: any) {
		return res.status(500).json({ error: err.message });
	}
}

export async function registerStudent(req: Request, res: Response) {
	if (req.body.role == "student") {
		try {
			const plainPassword = req.body.password;
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
			req.body.password = hashedPassword;

			const id = await insertUser(req.body);
			return res.status(201).json({ id: id });
		} catch (err: any) {
			return res.status(400).json({ error: err.message });
		}
	}
}

export async function registerInstructor(req: Request, res: Response) {
	if (req.user && req.user.role == "admin") {
		try {
			const id = await insertUser(req.body);

			return res.status(201).json({ id: id });
		} catch (err: any) {
			return res.status(400).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}

export async function getUserInfo(req: Request, res: Response) {
	if (req.params.id == req.user.id) {
		const id = Number(req.params.id);

		try {
			const user = await findUserByID(id);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			if (user.role == "student") {
				const courses = await findCoursesByStudentID(id);

				return res.status(200).json({
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					courses: courses,
				});
			}

			if (user.role == "instructor") {
				const courses = await findCoursesByInstructorID(id);

				return res.status(200).json({
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					courses: courses,
				});
			}

			return res.status(200).json(user);
		} catch (err: any) {
			return res.status(500).json({ error: err.message });
		}
	} else {
		return res.status(403).json(invalidRoleMessage);
	}
}
