import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function runTest() {
  try {
    console.log("Testing Cloudinary upload...");
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "preppilot/resumes", resource_type: "raw" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(Buffer.from("dummy resume content"));
    });
    console.log("Upload SUCCESS:", result.secure_url);
  } catch (err) {
    console.error("Upload FAILED:", err);
  }
}

runTest();
