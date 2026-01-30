import express from "express";
import {
  addExperience,
  getMyExperiences,
  deleteExperience,
} from "../controllers/experienceController.js";
import { protect } from "../middleware/authMiddleware.js";

console.log("🔥🔥 experienceRoutes.js LOADED 🔥🔥");

const router = express.Router();

/**
 * @route   POST /api/experience/add
 * @desc    Add new experience
 * @access  Private
 */
router.post("/add", protect, addExperience);

/**
 * @route   GET /api/experience/my-experiences
 * @desc    Get logged-in user's experiences
 * @access  Private
 */
router.get("/my-experiences", protect, getMyExperiences);

/**
 * @route   DELETE /api/experience/delete/:id
 * @desc    Delete an experience (only owner)
 * @access  Private
 */
router.delete("/delete/:id", protect, deleteExperience);

export default router;
