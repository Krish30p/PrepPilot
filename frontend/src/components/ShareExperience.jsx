import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShareExperience = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    difficulty: "Easy",
    rounds: "",
    salary: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "YOUR_BACKEND_URL/api/experience/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Experience shared successfully 🚀");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-indigo-100">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-indigo-50"
          >
            <ArrowLeft className="w-5 h-5 text-indigo-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Share Your Placement Experience
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="role"
            placeholder="Role (SDE, Analyst, etc.)"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <input
            type="text"
            name="rounds"
            placeholder="Number of Rounds"
            value={formData.rounds}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="salary"
            placeholder="CTC / Stipend"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="experience"
            placeholder="Write your complete interview experience..."
            rows={5}
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600
              text-white py-3 rounded-xl font-medium hover:from-indigo-700
              hover:to-purple-700 transition"
          >
            {loading ? "Submitting..." : "Submit Experience"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShareExperience;
