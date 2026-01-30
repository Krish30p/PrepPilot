import React, { useState } from "react";
import { ArrowLeft, Briefcase, DollarSign, FileText, Users, TrendingUp, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/apiPath";

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
  const [focusedField, setFocusedField] = useState(null);

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
      
      if (!token) {
        alert("Please login to share your experience");
        navigate("/login");
        return;
      }
      
      await axios.post(
        `${BASE_URL}/api/experience/add`,
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
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const difficultyOptions = [
    { value: "Easy", color: "from-green-500 to-emerald-500", bgColor: "bg-green-50", textColor: "text-green-700" },
    { value: "Medium", color: "from-yellow-500 to-orange-500", bgColor: "bg-yellow-50", textColor: "text-yellow-700" },
    { value: "Hard", color: "from-red-500 to-pink-500", bgColor: "bg-red-50", textColor: "text-red-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 mb-6 p-3 rounded-xl hover:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-indigo-600 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">
              Back
            </span>
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Share Your Experience
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Help fellow students by sharing your placement journey. Your insights can make a difference! ✨
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                Company Name
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'company' ? 'scale-[1.02]' : ''}`}>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g., Google, Microsoft, Amazon"
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Role */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Role / Position
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'role' ? 'scale-[1.02]' : ''}`}>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('role')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g., Software Engineer, Data Analyst"
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {difficultyOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                      formData.difficulty === option.value ? 'scale-105' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={option.value}
                      checked={formData.difficulty === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                        formData.difficulty === option.value
                          ? `${option.bgColor} border-transparent shadow-lg ${option.textColor} ring-4 ring-opacity-30`
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">{option.value}</div>
                      {formData.difficulty === option.value && (
                        <div className={`mt-1 h-1 rounded-full bg-gradient-to-r ${option.color}`}></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Rounds */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Users className="w-4 h-4 text-indigo-600" />
                Number of Interview Rounds
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'rounds' ? 'scale-[1.02]' : ''}`}>
                <input
                  type="number"
                  name="rounds"
                  value={formData.rounds}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('rounds')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g., 3"
                  min="1"
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Salary Package */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 text-indigo-600" />
                Salary Package (Optional)
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'salary' ? 'scale-[1.02]' : ''}`}>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('salary')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g., 12 LPA, $120k/year"
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Experience Details */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Your Experience & Tips
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'experience' ? 'scale-[1.02]' : ''}`}>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('experience')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Share your interview experience, preparation tips, important topics, and advice for others..."
                  rows="6"
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none placeholder-gray-400 resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {formData.experience.length} characters
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Experience
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-600 animate-fade-in">
          <p>Your contribution helps the community grow stronger 💪</p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ShareExperience;