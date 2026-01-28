import express from "express";
import { addExperience } from "../controllers/experienceController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/add", protect, addExperience);

export default router;
