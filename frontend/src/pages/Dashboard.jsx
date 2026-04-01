import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  TrendingUp,
  Award,
  FileText,
  Users,
  Upload,
  Briefcase,
  DollarSign,
  Trash2,
} from "lucide-react";
import axios from "axios";
import experiences from "../components/Experiences";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/apiPath";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);
  const [allBackendExperiences, setAllBackendExperiences] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loadingExperiences, setLoadingExperiences] = useState(true);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data?.user?.name) {
          setUserName(response.data.user.name);
        }

        // ✅ Store the logged-in user's _id for isMine comparison
        if (response.data?.user?._id) {
          setLoggedInUserId(response.data.user._id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Fetch ALL experiences from /api/experience (single global list)
  useEffect(() => {
    const fetchAllExperiences = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoadingExperiences(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/experience`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data?.experiences) {
          setAllBackendExperiences(response.data.experiences);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn(
            "Backend endpoint not configured yet. Experiences will be empty."
          );
          setAllBackendExperiences([]);
        } else {
          console.error("Error fetching experiences:", error);
        }
      } finally {
        setLoadingExperiences(false);
      }
    };

    fetchAllExperiences();
  }, []);

  // ✅ MERGED DATA LOGIC
  // - Backend experiences: compare experience.user._id with loggedInUserId to set isMine
  // - Static community experiences: always isMine = false
  const allExperiences = useMemo(() => {
    const backendExperiences = allBackendExperiences.map((exp) => ({
      ...exp,
      isMine:
        loggedInUserId &&
        (exp.user?._id === loggedInUserId || exp.user === loggedInUserId),
      id: exp._id || exp.id,
    }));

    const communityExperiences = experiences.map((exp, index) => ({
      ...exp,
      isMine: false,
      id: exp.id || `community-${index}`,
    }));

    // Backend experiences first (most recent / user's own), then static
    return [...backendExperiences, ...communityExperiences];
  }, [allBackendExperiences, loggedInUserId]);

  // SEARCH LOGIC - Filter merged experiences based on search query
  const filteredExperiences = useMemo(() => {
    if (!searchQuery.trim()) {
      return allExperiences;
    }

    const query = searchQuery.toLowerCase();
    return allExperiences.filter((exp) => {
      const companyMatch = exp.company?.toLowerCase().includes(query);
      const roleMatch = exp.role?.toLowerCase().includes(query);
      return companyMatch || roleMatch;
    });
  }, [allExperiences, searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file");
      return;
    }

    setSelectedFile(file);
    setUploadingResume(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(
        `${BASE_URL}/api/upload-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResumeUrl(res.data.url);
      alert("Resume uploaded to Cloudinary successfully! 🎉");
    } catch (err) {
      console.error("Resume upload failed:", err);
      alert("Failed to upload resume. Please try again.");
      setSelectedFile(null);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleResumeButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteResume = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your resume?"
    );
    if (confirmed) {
      setSelectedFile(null);
      setResumeUrl(null);
    }
  };

  const handleDeleteExperience = async (experienceId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${BASE_URL}/api/experience/delete/${experienceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Remove deleted experience from the global backend list
        setAllBackendExperiences((prev) =>
          prev.filter((exp) => exp._id !== experienceId)
        );
        alert("Experience deleted successfully");
      } catch (error) {
        console.error("Error deleting experience:", error);

        if (error.response?.status === 404) {
          alert(
            "Backend endpoint not configured yet. Please set up the backend to enable delete functionality."
          );
        } else {
          alert("Failed to delete experience. Please try again.");
        }
      }
    }
  };

  const mySkills = ["DSA", "React", "Node.js", "SQL"];
  const popularSkills = [
    { skill: "DSA", percent: 80 },
    { skill: "Java", percent: 65 },
    { skill: "React", percent: 55 },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Hard":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Easy":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Header */}
          <header className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {userName}
                </h1>
                <p className="text-gray-600 mt-1">
                  Track your placement journey and explore opportunities
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  {userName[0].toUpperCase()}
                </button>

                {showLogoutMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowLogoutMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main */}
            <div className="lg:col-span-3 space-y-6">
              {/* Explore */}
              <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-indigo-100">
                <div className="flex items-center gap-2 mb-6">
                  <Search className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Explore Placement Experiences
                  </h2>
                </div>

                <div className="relative mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        placeholder="Search by Company, Role, or College..."
                        className="w-full border-2 border-gray-200 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <button
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
                    >
                      <Search className="w-5 h-5" />
                      Search
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mb-6 flex-wrap">
                  {["Top Companies", "Recent", "Internships", "Full-Time"].map(
                    (tag) => (
                      <button
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-full text-sm font-medium text-indigo-700 transition-all border border-indigo-200"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>

                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium">
                  Explore All Experiences →
                </button>
              </section>

              {/* ============================================================================ */}
              {/* UNIFIED EXPERIENCES RENDERING - Single global list */}
              {/* ============================================================================ */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  Recently Shared Experiences
                  {searchQuery && (
                    <span className="text-sm font-normal text-gray-500">
                      (Results for "{searchQuery}")
                    </span>
                  )}
                </h2>

                {loadingExperiences ? (
                  <div className="flex justify-center py-12">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredExperiences.length > 0 ? (
                      filteredExperiences.map((exp) => (
                        <div
                          key={exp.id}
                          className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group relative ${
                            exp.isMine
                              ? "bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300"
                              : "bg-white border border-indigo-100 hover:border-indigo-300"
                          }`}
                        >
                          {/* "Your Post" Badge */}
                          {exp.isMine && (
                            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                              Your Post
                            </div>
                          )}

                          <div
                            className={`flex items-start justify-between mb-3 ${
                              exp.isMine ? "pr-20" : ""
                            }`}
                          >
                            <div className="flex-1">
                              <h3
                                className={`font-bold text-lg text-gray-800 transition-colors ${
                                  exp.isMine
                                    ? "group-hover:text-purple-600"
                                    : "group-hover:text-indigo-600"
                                }`}
                              >
                                {exp.company}
                              </h3>
                              <p className="text-sm text-gray-600 font-medium flex items-center gap-1">
                                <Briefcase className="w-3 h-3" />
                                {exp.role}
                              </p>
                            </div>
                            {!exp.isMine && (
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                                  exp.difficulty
                                )}`}
                              >
                                {exp.difficulty}
                              </span>
                            )}
                          </div>

                          {exp.isMine && (
                            <div className="mb-3">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                                  exp.difficulty
                                )}`}
                              >
                                {exp.difficulty}
                              </span>
                            </div>
                          )}

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users
                                className={`w-4 h-4 ${
                                  exp.isMine
                                    ? "text-purple-500"
                                    : "text-indigo-500"
                                }`}
                              />
                              <span>Rounds: {exp.rounds}</span>
                            </div>
                            {exp.salary && (
                              <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                                {exp.isMine ? (
                                  <DollarSign className="w-4 h-4" />
                                ) : (
                                  <Award className="w-4 h-4" />
                                )}
                                <span>{exp.salary}</span>
                              </div>
                            )}
                          </div>

                          {/* Show experience text for user's posts */}
                          {exp.isMine && exp.experience && (
                            <div className="bg-white/60 rounded-lg p-3 mb-3">
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {exp.experience}
                              </p>
                            </div>
                          )}

                          {/* Action buttons */}
                          {exp.isMine ? (
                            <div className="flex gap-2">
                              <button
                                className="flex-1 text-purple-600 hover:text-purple-700 font-medium hover:bg-white/80 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                                onClick={() => alert("View full experience")}
                              >
                                <FileText className="w-4 h-4" />
                                View Details
                              </button>
                              <button
                                className="text-red-600 hover:text-red-700 font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-all flex items-center gap-1 text-sm"
                                onClick={() => handleDeleteExperience(exp._id)}
                                title="Delete your experience"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              className="w-full mt-3 text-indigo-600 hover:text-indigo-700 font-medium hover:bg-indigo-50 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                              onClick={() => alert("View full experience")}
                            >
                              View Experience →
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                        {searchQuery ? (
                          <>
                            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">
                              No experiences found matching "{searchQuery}"
                            </p>
                            <button
                              onClick={() => {
                                setSearchQuery("");
                                setSearchInput("");
                              }}
                              className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                              Clear search
                            </button>
                          </>
                        ) : (
                          <>
                            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg mb-2">
                              No experiences shared yet
                            </p>
                            <p className="text-gray-400 text-sm mb-4">
                              Be the first to share your placement journey!
                            </p>
                            <button
                              onClick={() => navigate("/share-experience")}
                              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
                            >
                              Share Your Experience
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Add Contributions */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100">
                <div className="flex items-center gap-2 mb-5">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-lg">Add Contributions</h3>
                </div>

                <div className="space-y-4">
                  {/* Add/View Resume */}
                  {!selectedFile ? (
                    <button
                      onClick={handleResumeButtonClick}
                      className="w-full flex items-center justify-between p-4 rounded-xl
                     bg-indigo-50 hover:bg-indigo-100 transition
                     border border-indigo-200"
                    >
                      <span className="font-medium text-indigo-700 flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Add Your Resume
                      </span>
                      <span className="text-indigo-600 font-bold text-xl">
                        +
                      </span>
                    </button>
                  ) : (
                    <div className="w-full p-4 rounded-xl bg-green-50 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-green-700 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {uploadingResume ? "Uploading..." : "Resume Uploaded ✅"}
                        </span>
                        {!uploadingResume && (
                          <button
                            onClick={handleDeleteResume}
                            className="text-red-600 hover:text-red-700 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {selectedFile.name}
                      </p>
                      {uploadingResume ? (
                        <div className="flex items-center justify-center py-2">
                          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="ml-2 text-sm text-gray-500">Uploading to Cloudinary...</span>
                        </div>
                      ) : resumeUrl ? (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block text-center text-indigo-600 hover:text-indigo-700 font-medium hover:bg-indigo-50 py-2 rounded-lg transition-all text-sm"
                        >
                          See Your Resume →
                        </a>
                      ) : (
                        <p className="text-xs text-red-500">Upload failed</p>
                      )}
                    </div>
                  )}

                  {/* Share Experience */}
                  <button
                    onClick={() => navigate("/share-experience")}
                    className="w-full flex items-center justify-between p-4 rounded-xl
     bg-purple-50 hover:bg-purple-100 transition
     border border-purple-200"
                  >
                    <span className="font-medium text-purple-700">
                      Share Experience
                    </span>
                    <span className="text-purple-600 font-bold text-xl">+</span>
                  </button>
                </div>
              </div>

              {/* AI Resume Insights */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-lg">AI Resume Insights</h3>
                </div>

                {/* My Skills */}
                <div className="flex gap-2 flex-wrap mb-6">
                  {mySkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100
                     text-indigo-700 rounded-full text-sm font-medium
                     border border-indigo-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Popular Skills */}
                <div className="space-y-3">
                  {popularSkills.map((item) => (
                    <div key={item.skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">
                          {item.skill}
                        </span>
                        <span className="font-bold text-indigo-600">
                          {item.percent}%
                        </span>
                      </div>

                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600
                         rounded-full transition-all duration-500"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <footer className="mt-10 text-center bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
            <p className="text-gray-600">
              🚀 <span className="font-semibold">Got placed?</span> Share your
              journey and help others on{" "}
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PrepPilot
              </span>
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Dashboard;