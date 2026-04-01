import express from "express";
import upload from "../middleware/multer.js";
import { uploadResume, uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload-resume", upload.single("resume"), uploadResume);
router.post("/upload-image", upload.single("image"), uploadImage);

export default router;
