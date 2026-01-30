import Experience from "../models/Experience.js";

/**
 * @route   POST /api/experience/add
 * @desc    Add a new experience
 * @access  Private
 */
export const addExperience = async (req, res) => {
  try {
    const { company, role, difficulty, rounds, salary, experience } = req.body;

    // Basic validation
    if (!company || !role || !rounds || !experience) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newExperience = await Experience.create({
      user: req.user._id, // comes from protect middleware
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
 * @desc    Get experiences of logged-in user
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
 * @route   DELETE /api/experience/delete/:id
 * @desc    Delete an experience (only owner)
 * @access  Private
 */
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Ensure only the owner can delete
    if (experience.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this experience" });
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
