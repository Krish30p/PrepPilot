import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect db
connectDB();

// routes
app.use("/api/auth", userRoutes);
app.use("/api", uploadRoutes);
app.use("/api/experience", experienceRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
