import { useState } from 'react';
import { 
  Search,
  Filter,
  ChevronDown,
  User,
  FileText,
  LogOut,
  Briefcase,
  Building2,
  TrendingUp,
  Eye,
  Share2,
  Star,
  Clock,
  Users,
  Award,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  BarChart3,
  BookOpen,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // User data
  const user = {
    name: "Aditya Verma",
    college: "IIT Bombay",
    branch: "Computer Science & Engineering",
    avatar: "AV"
  };

  // Filter options
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'top-companies', label: 'Top Companies' },
    { id: 'recent', label: 'Recent' },
    { id: 'internships', label: 'Internships' },
    { id: 'full-time', label: 'Full-Time' }
  ];

  // Recently shared experiences
  const recentExperiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      contributor: "Priya Sharma",
      college: "IIT Delhi",
      difficulty: "Hard",
      rounds: 5,
      postedDate: "2 days ago",
      views: 1243,
      helpful: 89
    },
    {
      id: 2,
      company: "Microsoft",
      role: "SDE Intern",
      contributor: "Rahul Kumar",
      college: "IIT Bombay",
      difficulty: "Medium",
      rounds: 4,
      postedDate: "5 days ago",
      views: 876,
      helpful: 67
    },
    {
      id: 3,
      company: "Amazon",
      role: "Software Development Engineer",
      contributor: "Sneha Patel",
      college: "BITS Pilani",
      difficulty: "Medium",
      rounds: 6,
      postedDate: "1 week ago",
      views: 2145,
      helpful: 142
    },
    {
      id: 4,
      company: "Goldman Sachs",
      role: "Technology Analyst",
      contributor: "Arjun Mehta",
      college: "IIT Kharagpur",
      difficulty: "Hard",
      rounds: 3,
      postedDate: "1 week ago",
      views: 654,
      helpful: 45
    },
    {
      id: 5,
      company: "Flipkart",
      role: "SDE-1",
      contributor: "Ananya Singh",
      college: "NIT Trichy",
      difficulty: "Medium",
      rounds: 4,
      postedDate: "2 weeks ago",
      views: 987,
      helpful: 71
    }
  ];

  // User's contribution stats
  const contributionStats = [
    {
      title: "Resumes Shared",
      value: "3",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Experiences Posted",
      value: "2",
      icon: <Briefcase className="w-6 h-6" />,
      color: "bg-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Total Views",
      value: "1,247",
      icon: <Eye className="w-6 h-6" />,
      color: "bg-green-500",
      bgColor: "bg-green-50"
    }
  ];

  // Resume insights for user's college
  const resumeInsights = {
    totalResumes: 145,
    collegeName: user.college,
    topSkills: [
      { skill: "React", count: 98 },
      { skill: "Python", count: 87 },
      { skill: "Node.js", count: 76 },
      { skill: "Data Structures", count: 142 },
      { skill: "Machine Learning", count: 64 },
      { skill: "System Design", count: 58 }
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name} 👋
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4" />
                  {user.college} • {user.branch}
                </p>
              </div>
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.avatar}
                </div>
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                    <Share2 className="w-4 h-4" />
                    My Contributions
                  </button>
                  <hr className="my-1" />
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Explore Placement Experiences Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Explore Placement Experiences</h2>
              <p className="text-sm text-gray-600 mt-1">Learn from students who got placed</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
              Explore All Experiences
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company, role, or college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recently Shared Experiences */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Shared Experiences</h2>
              <div className="space-y-4">
                {recentExperiences.map((experience) => (
                  <div key={experience.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{experience.company}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(experience.difficulty)}`}>
                            {experience.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium mb-2">{experience.role}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {experience.contributor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {experience.college}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-blue-50 px-4 py-2 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{experience.rounds}</div>
                          <div className="text-xs text-gray-600">Rounds</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {experience.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {experience.helpful} found helpful
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {experience.postedDate}
                        </span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        View Experience
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* My Contributions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Contributions</h2>
              
              <div className="space-y-4 mb-6">
                {contributionStats.map((stat, index) => (
                  <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} bg-opacity-20 p-3 rounded-lg`}>
                        <div className={`${stat.color} text-white`}>
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Your Placement Experience
              </button>
            </div>

            {/* Resume Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm p-6 border border-purple-100">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Resume Insights</h2>
              </div>

              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Resumes Available</span>
                  <span className="text-2xl font-bold text-purple-600">{resumeInsights.totalResumes}</span>
                </div>
                <p className="text-xs text-gray-500">from {resumeInsights.collegeName}</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Skills</h3>
                <div className="space-y-2">
                  {resumeInsights.topSkills.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.skill}</span>
                        <span className="text-gray-500">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-1.5 rounded-full"
                          style={{ width: `${(item.count / resumeInsights.totalResumes) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Total Contributors
                  </span>
                  <span className="font-bold text-gray-900">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Experiences Shared
                  </span>
                  <span className="font-bold text-gray-900">5,432</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Resumes Available
                  </span>
                  <span className="font-bold text-gray-900">3,156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Companies Covered
                  </span>
                  <span className="font-bold text-gray-900">287</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Got Placed? Help Others!</h3>
                <p className="text-blue-100 max-w-2xl">
                  Your experience can guide hundreds of students preparing for placements. 
                  Share your interview journey, tips, and resume to give back to the community.
                </p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2 whitespace-nowrap">
              <Zap className="w-5 h-5" />
              Contribute Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;