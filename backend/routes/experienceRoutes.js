import express from "express";
import {
  addExperience,
  getMyExperiences,
  getAllExperiences,
  deleteExperience,
} from "../controllers/experienceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add experience (Private)
router.post("/add", protect, addExperience);

// Get logged-in user's experiences (Private)
router.get("/my-experiences", protect, getMyExperiences);

// Get all experiences (Global feed)
router.get("/", getAllExperiences);

// Delete experience (Private)
router.delete("/delete/:id", protect, deleteExperience);

export default router;