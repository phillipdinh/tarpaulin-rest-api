import express from "express";

import { authenticateToken } from "../middleware/auth.middleware.js";

import {
	registerStudent,
	registerInstructor,
	userLogin,
	getUserInfo,
} from "../controllers/user_controller.js";

const router = express.Router();

router.post("/login", userLogin);

router.post("/register/student", registerStudent);

router.post("/register/instructor", authenticateToken, registerInstructor);

// Endpoint to get a user by id
router.get("/:id", authenticateToken, getUserInfo);

export default router;
