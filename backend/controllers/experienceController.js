import Experience from "../models/Experience.js";

export const addExperience = async (req, res) => {
  try {
    const { company, role, difficulty, rounds, salary, experience } = req.body;

    if (!company || !role || !rounds || !experience) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newExperience = await Experience.create({
      user: req.user._id,   
      company,
      role,
      difficulty,
      rounds,
      salary,
      experience,
    });

    res.status(201).json({
      success: true,
      message: "Experience saved successfully",
      data: newExperience,
    });
  } catch (error) {
    console.error("Add experience error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
