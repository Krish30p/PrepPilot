import Experience from "../models/Experience.js";

/**
 * @route   POST /api/experience/add
 * @desc    Add new experience
 * @access  Private
 */
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

/**
 * @route   GET /api/experience/my-experiences
 * @desc    Get logged-in user's experiences
 * @access  Private
 */
export const getMyExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ experiences });
  } catch (error) {
    console.error("Get my experiences error:", error);
    res.status(500).json({ message: "Failed to fetch experiences" });
  }
};

/**
 * @route   GET /api/experience
 * @desc    Get all experiences (global feed)
 * @access  Public
 */
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ experiences });
  } catch (error) {
    console.error("Get all experiences error:", error);
    res.status(500).json({ message: "Failed to fetch experiences" });
  }
};

/**
 * @route   DELETE /api/experience/delete/:id
 * @desc    Delete experience (only owner)
 * @access  Private
 */
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    if (experience.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};