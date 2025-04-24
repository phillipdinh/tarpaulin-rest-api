import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import user from "./src/routes/user.routes.js";
import course from "./src/routes/course.routes.js";
import assignment from "./src/routes/assignment.routes.js";
import submission from "./src/routes/submission.routes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(express.json());
app.use(cors());
app.use("/users", user);
app.use("/courses", course);
app.use("/assignments", assignment);
app.use("/submissions", submission);

// Start server
app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on port:${PORT}`);
});
