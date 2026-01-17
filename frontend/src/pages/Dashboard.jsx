import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Search, TrendingUp, Award, FileText, Users } from "lucide-react";

const Dashboard = () => {
  const context = useContext(UserContext);
  const [searchInput, setSearchInput] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showLogoutMenu, setShowLogoutMenu] = React.useState(false);

  if (!context) {
    return <div className="p-6">Context not available</div>;
  }

  const { user, loading, clearUser } = context;

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const experiences = [
    {
      company: "Google",
      role: "SWE",
      difficulty: "Hard",
      rounds: 5,
      salary: "₹45 LPA",
    },
    {
      company: "Amazon",
      role: "SDE Intern",
      difficulty: "Medium",
      rounds: 3,
      salary: "₹80k/month",
    },
    {
      company: "Microsoft",
      role: "SWE",
      difficulty: "Medium",
      rounds: 4,
      salary: "₹42 LPA",
    },
    {
      company: "Meta",
      role: "Frontend Engineer",
      difficulty: "Hard",
      rounds: 6,
      salary: "₹50 LPA",
    },
    {
      company: "Netflix",
      role: "SDE II",
      difficulty: "Hard",
      rounds: 5,
      salary: "₹55 LPA",
    },
    {
      company: "Apple",
      role: "Software Engineer",
      difficulty: "Medium",
      rounds: 4,
      salary: "₹48 LPA",
    },
  ];

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredExperiences = searchQuery
    ? experiences.filter((exp) => {
        const query = searchQuery.toLowerCase();
        return (
          exp.company.toLowerCase().includes(query) ||
          exp.role.toLowerCase().includes(query)
        );
      })
    : experiences;

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
      {/* Header */}
      <header className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {user.name}
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
              {user.name[0]}
            </button>
            
            {showLogoutMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                <button
                  onClick={() => {
                    clearUser();
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
                ),
              )}
            </div>

            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium">
              Explore All Experiences →
            </button>
          </section>

          {/* Experiences */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExperiences.length > 0 ? (
                filteredExperiences.map((e, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-indigo-100 hover:border-indigo-300 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {e.company}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {e.role}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(e.difficulty)}`}
                      >
                        {e.difficulty}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-indigo-500" />
                        <span>Rounds: {e.rounds}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                        <Award className="w-4 h-4" />
                        <span>{e.salary}</span>
                      </div>
                    </div>

                    <button className="w-full mt-3 text-indigo-600 hover:text-indigo-700 font-medium hover:bg-indigo-50 py-2 rounded-lg transition-all flex items-center justify-center gap-2">
                      View Experience →
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-2 bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
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
                </div>
              )}
            </div>
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
              {/* Add Resume */}
              <button
                onClick={() => console.log("Navigate to add resume")}
                className="w-full flex items-center justify-between p-4 rounded-xl
                   bg-indigo-50 hover:bg-indigo-100 transition
                   border border-indigo-200"
              >
                <span className="font-medium text-indigo-700">
                  Add Your Resume
                </span>
                <span className="text-indigo-600 font-bold text-xl">+</span>
              </button>

              {/* Share Experience */}
              <button
                onClick={() => console.log("Navigate to share experience")}
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

            <p className="text-sm text-gray-600 mb-4">Total resumes: 124</p>

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
    </div>
  );
};

export default Dashboard;