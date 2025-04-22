import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import user_routes from "./routes/user_routes.js";
import course_routes from "./routes/course_routes.js";
import assignment_routes from "./routes/assignment_routes.js";
import submission_routes from "./routes/submission_routes.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
// TODO: remove
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/users", user_routes);
app.use("/courses", course_routes);
app.use("/assignments", assignment_routes);
app.use("/submissions", submission_routes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server running on port:${PORT}`);
});
