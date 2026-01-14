import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const context = useContext(UserContext);
  const [searchQuery, setSearchQuery] = React.useState("");

  if (!context) {
    return <div className="p-6">Context not available</div>;
  }

  const { user, loading, clearUser } = context;

  if (loading || !user) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const experiences = [
    { company: "Google", role: "SWE", difficulty: "Hard", rounds: 5 },
    { company: "Amazon", role: "SDE Intern", difficulty: "Medium", rounds: 3 },
    { company: "Microsoft", role: "SWE", difficulty: "Medium", rounds: 4 },
  ];

  const filteredExperiences = experiences.filter((exp) => {
    const query = searchQuery.toLowerCase();
    return (
      exp.company.toLowerCase().includes(query) ||
      exp.role.toLowerCase().includes(query)
    );
  });

  const mySkills = ["DSA", "React", "Node.js", "SQL"];
  const popularSkills = [
    { skill: "DSA", percent: 80 },
    { skill: "Java", percent: 65 },
    { skill: "React", percent: 55 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user.name} 👋
        </h1>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {user.name[0]}
          </div>
          <button
            onClick={clearUser}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main */}
        <div className="lg:col-span-3 space-y-8">
          {/* Explore */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Explore Placement Experiences
            </h2>

            <input
              placeholder="Search by Company, Role, or College"
              className="w-full border px-4 py-2 rounded-lg mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex gap-2 mb-4 flex-wrap">
              {["Top Companies", "Recent", "Internships", "Full-Time"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
              Explore All Experiences
            </button>
          </section>

          {/* Experiences */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Recently Shared Experiences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExperiences.length > 0 ? (
                filteredExperiences.map((e, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl shadow">
                    <h3 className="font-semibold">{e.company}</h3>
                    <p className="text-sm text-gray-600">{e.role}</p>
                    <p className="mt-2 text-sm">Difficulty: {e.difficulty}</p>
                    <p className="text-sm">Rounds: {e.rounds}</p>
                    <button className="mt-3 text-indigo-600 hover:underline">
                      View Experience →
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500">
                  No experiences found matching "{searchQuery}"
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">My Contributions</h3>
            <p>Resumes Shared: 1</p>
            <p>Experiences Posted: 2</p>
            <p>Total Views: 340</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Resume Insights</h3>
            <p className="text-sm mb-3">Total resumes: 124</p>

            <div className="flex gap-2 flex-wrap mb-4">
              {mySkills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>

            {popularSkills.map((p) => (
              <div key={p.skill} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span>{p.skill}</span>
                  <span>{p.percent}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-indigo-600 rounded"
                    style={{ width: `${p.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <footer className="mt-10 text-center text-gray-600 text-sm">
        🚀 Got placed? Share your journey and help others on PrepPilot.
      </footer>
    </div>
  );
};

export default Dashboard;