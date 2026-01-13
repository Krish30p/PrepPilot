import { useState } from 'react';
import { 
  Brain,
  Target,
  TrendingUp,
  Calendar,
  Award,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Video,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  MessageSquare,
  BarChart3,
  Upload,
  Play,
  BookOpen,
  Zap,
  ArrowRight,
  Star,
  ThumbsUp,
  AlertCircle,
  LineChart
} from 'lucide-react';

const Dashboard = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  // User data
  const user = {
    name: "Rahul Sharma",
    email: "rahul.sharma@student.edu",
    avatar: "RS",
    targetRole: "Software Development Engineer"
  };

  // Interview readiness score
  const readinessScore = {
    overall: 73,
    technical: 78,
    behavioral: 68,
    communication: 75,
    confidence: 70,
    trend: "+5% from last week"
  };

  // Mock interview history
  const mockInterviews = [
    {
      id: 1,
      type: "Technical",
      company: "Google",
      date: "2 days ago",
      duration: "45 min",
      score: 82,
      status: "completed",
      keyTopics: ["Data Structures", "System Design", "Algorithms"],
      aiFeedback: "Strong problem-solving approach. Work on explaining thought process more clearly."
    },
    {
      id: 2,
      type: "Behavioral",
      company: "Amazon",
      date: "5 days ago",
      duration: "30 min",
      score: 75,
      status: "completed",
      keyTopics: ["Leadership", "Conflict Resolution", "Team Work"],
      aiFeedback: "Good use of STAR method. Include more specific metrics in your examples."
    },
    {
      id: 3,
      type: "Technical",
      company: "Microsoft",
      date: "1 week ago",
      duration: "60 min",
      score: 68,
      status: "completed",
      keyTopics: ["Coding", "Problem Solving", "Time Complexity"],
      aiFeedback: "Consider edge cases earlier. Your solution was correct but could be optimized."
    },
    {
      id: 4,
      type: "HR Round",
      company: "Meta",
      date: "1 week ago",
      duration: "25 min",
      score: 71,
      status: "completed",
      keyTopics: ["Career Goals", "Company Culture", "Motivation"],
      aiFeedback: "Authentic responses. Research more about company values before interview."
    }
  ];

  // AI-generated insights
  const aiInsights = [
    {
      category: "Strength",
      title: "Technical Problem Solving",
      description: "You consistently solve medium-level DSA problems efficiently",
      icon: <ThumbsUp className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      category: "Improvement",
      title: "Communication Clarity",
      description: "Practice articulating your thought process during problem solving",
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      category: "Strength",
      title: "Behavioral Responses",
      description: "STAR method application is improving steadily",
      icon: <Star className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      category: "Focus Area",
      title: "System Design",
      description: "Needs more practice on scalability and trade-offs",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  // Resume insights
  const resumeInsights = {
    uploadDate: "Jan 10, 2026",
    score: 78,
    strengths: [
      "Clear project descriptions with quantifiable impact",
      "Relevant technical skills highlighted",
      "Good action verbs usage"
    ],
    improvements: [
      "Add more metrics to achievements (e.g., 'Improved performance by 40%')",
      "Include links to GitHub and live project demos",
      "Customize resume for each target role"
    ],
    atsCompatibility: 85,
    keywordMatch: 72
  };

  // Personalized study plan
  const studyPlan = [
    {
      week: "Week 1-2",
      focus: "Data Structures Mastery",
      tasks: [
        { title: "Arrays & Strings - 20 problems", completed: 15, total: 20 },
        { title: "Linked Lists - 15 problems", completed: 12, total: 15 },
        { title: "Mock Interview: DSA Focus", completed: 1, total: 1 }
      ],
      status: "in-progress",
      aiRecommendation: "You're doing well! Focus on optimizing solutions for better time complexity."
    },
    {
      week: "Week 3-4",
      focus: "System Design Fundamentals",
      tasks: [
        { title: "Watch 5 system design videos", completed: 0, total: 5 },
        { title: "Design 3 common systems", completed: 0, total: 3 },
        { title: "Mock Interview: System Design", completed: 0, total: 1 }
      ],
      status: "upcoming",
      aiRecommendation: "Start with basics: Load balancing, caching, and database sharding."
    },
    {
      week: "Week 5-6",
      focus: "Behavioral & HR Preparation",
      tasks: [
        { title: "Prepare 10 STAR stories", completed: 0, total: 10 },
        { title: "Research target companies", completed: 0, total: 5 },
        { title: "Mock Interview: Behavioral", completed: 0, total: 2 }
      ],
      status: "upcoming",
      aiRecommendation: "Document your experiences with specific metrics and outcomes."
    }
  ];

  // Performance trends
  const performanceTrends = [
    { month: "Sep", score: 58 },
    { month: "Oct", score: 62 },
    { month: "Nov", score: 67 },
    { month: "Dec", score: 70 },
    { month: "Jan", score: 73 }
  ];

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name} 👋
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <Target className="w-4 h-4" />
                  {user.targetRole}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Interview Readiness</p>
                <p className="text-2xl font-bold text-blue-600">{readinessScore.overall}%</p>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.avatar}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                      <Settings className="w-4 h-4" />
                      Settings
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Readiness Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Score Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Interview Readiness</h2>
              <Brain className="w-6 h-6" />
            </div>
            <div className="text-5xl font-bold mb-2">{readinessScore.overall}%</div>
            <p className="text-blue-100 text-sm mb-4">{readinessScore.trend}</p>
            <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur">
              <div className="flex justify-between text-sm mb-1">
                <span>Technical</span>
                <span className="font-semibold">{readinessScore.technical}%</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Behavioral</span>
                <span className="font-semibold">{readinessScore.behavioral}%</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Communication</span>
                <span className="font-semibold">{readinessScore.communication}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Confidence</span>
                <span className="font-semibold">{readinessScore.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all text-left border-2 border-transparent hover:border-blue-500">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Start Mock Interview</h3>
              <p className="text-sm text-gray-500">AI-powered interview simulation</p>
            </button>

            <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all text-left border-2 border-transparent hover:border-purple-500">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Analyze Resume</h3>
              <p className="text-sm text-gray-500">Get AI feedback on your resume</p>
            </button>

            <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all text-left border-2 border-transparent hover:border-green-500">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Study Plan</h3>
              <p className="text-sm text-gray-500">Personalized preparation roadmap</p>
            </button>

            <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all text-left border-2 border-transparent hover:border-orange-500">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">View Analytics</h3>
              <p className="text-sm text-gray-500">Track your progress over time</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mock Interview History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Mock Interview History</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {mockInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{interview.type} Interview</h3>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {interview.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {interview.date}
                          </span>
                          <span>{interview.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(interview.score)}`}>
                          {interview.score}%
                        </div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {interview.keyTopics.map((topic, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-purple-900 mb-1">AI Feedback</p>
                          <p className="text-sm text-purple-800">{interview.aiFeedback}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Trends</h2>
              
              <div className="flex items-end justify-between h-48 gap-3 mb-4">
                {performanceTrends.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                      <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg absolute bottom-0"
                        style={{ height: `${data.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                    <span className="text-xs text-gray-500">{data.score}%</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+15%</div>
                  <div className="text-sm text-gray-600">Growth Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Total Interviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* AI Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
              </div>

              <div className="space-y-3">
                {aiInsights.map((insight, idx) => (
                  <div key={idx} className={`${insight.bgColor} border border-gray-200 rounded-lg p-4`}>
                    <div className="flex items-start gap-3">
                      <div className={insight.color}>
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-gray-500 uppercase">
                            {insight.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          {insight.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Resume Insights</h2>
                <button className="text-blue-600 hover:text-blue-700">
                  <Upload className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Overall Score</span>
                  <span className="text-xl font-bold text-blue-600">{resumeInsights.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${resumeInsights.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Updated {resumeInsights.uploadDate}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900">Strengths</span>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {resumeInsights.strengths.map((strength, idx) => (
                      <li key={idx} className="text-xs text-gray-600">• {strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-semibold text-gray-900">Improvements</span>
                  </div>
                  <ul className="space-y-1 ml-6">
                    {resumeInsights.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-xs text-gray-600">• {improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{resumeInsights.atsCompatibility}%</div>
                  <div className="text-xs text-gray-500">ATS Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{resumeInsights.keywordMatch}%</div>
                  <div className="text-xs text-gray-500">Keyword Match</div>
                </div>
              </div>
            </div>

            {/* Study Plan Preview */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-sm p-6 border border-purple-100">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-900">This Week's Focus</h2>
              </div>

              <div className="bg-white rounded-lg p-4 mb-3">
                <h3 className="font-semibold text-gray-900 mb-2">{studyPlan[0].focus}</h3>
                <div className="space-y-2">
                  {studyPlan[0].tasks.map((task, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{task.title}</span>
                        <span className="text-gray-500">{task.completed}/{task.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{ width: `${(task.completed / task.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-100 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-600 mt-0.5" />
                  <p className="text-sm text-purple-900">{studyPlan[0].aiRecommendation}</p>
                </div>
              </div>

              <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                View Full Study Plan
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;