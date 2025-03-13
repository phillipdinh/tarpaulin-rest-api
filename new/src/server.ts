import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());
// app.use("/api/users/", userRoutes);

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
