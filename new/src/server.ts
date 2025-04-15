import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import user_routes from "./routes/user_routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/users", user_routes);

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
