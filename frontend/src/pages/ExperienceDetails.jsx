import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Building2,
  Briefcase,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Lightbulb,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Star,
} from "lucide-react";
import { BASE_URL } from "../utils/apiPath";

/* ─────────────────────────────────────────
   Difficulty config — mirrors ShareExperience radio cards
───────────────────────────────────────── */
const DIFFICULTY = {
  Easy:   { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  bar: "from-green-500 to-emerald-500",  dot: "bg-green-500"  },
  Medium: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", bar: "from-yellow-500 to-orange-500", dot: "bg-yellow-500" },
  Hard:   { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    bar: "from-red-500 to-pink-500",      dot: "bg-red-500"    },
};

/* ─────────────────────────────────────────
   Reusable: glassmorphic card
───────────────────────────────────────── */
const GlassCard = ({ children, className = "", delay = 0 }) => (
  <div
    className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-slide-up ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

/* ─────────────────────────────────────────
   Reusable: section header
───────────────────────────────────────── */
const SectionHeader = ({ icon: Icon, title, gradient = "from-indigo-500 to-purple-600" }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
  </div>
);

/* ─────────────────────────────────────────
   Reusable: quick-info row
───────────────────────────────────────── */
const InfoRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-indigo-500" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Round Accordion
───────────────────────────────────────── */
const RoundAccordion = ({ round, index }) => {
  const [open, setOpen] = useState(index === 0);
  const name      = typeof round === "string" ? round : round.name || round.title || `Round ${index + 1}`;
  const desc      = typeof round === "object" ? round.description : null;
  const questions = typeof round === "object" && Array.isArray(round.questions) ? round.questions : [];
  const tip       = typeof round === "object" ? round.tips || round.tip : null;

  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 mb-3 ${open ? "border-indigo-200 shadow-md" : "border-gray-100"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 hover:from-indigo-100/80 hover:to-purple-100/80 transition-all duration-300 text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            {index + 1}
          </span>
          <span className="font-semibold text-gray-800">{name}</span>
          {typeof round === "object" && round.duration && (
            <span className="text-xs text-gray-400 bg-white/70 px-2 py-0.5 rounded-full hidden sm:inline">
              {round.duration}
            </span>
          )}
        </div>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"}`}>
          {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-5 py-4 bg-white/60 space-y-3">
          {desc && <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>}
          {questions.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Questions Asked</p>
              <ul className="space-y-2">
                {questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tip && (
            <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
              <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">{tip}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Shared blobs background
───────────────────────────────────────── */
const Blobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
    <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
  </div>
);

/* ─────────────────────────────────────────
   Shared keyframe styles
───────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @keyframes blob {
      0%, 100% { transform: translate(0,0) scale(1); }
      25%       { transform: translate(20px,-50px) scale(1.1); }
      50%       { transform: translate(-20px,20px) scale(0.9); }
      75%       { transform: translate(50px,50px) scale(1.05); }
    }
    @keyframes fade-in  { from { opacity:0; } to { opacity:1; } }
    @keyframes slide-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    .animate-blob            { animation: blob 7s infinite; }
    .animation-delay-2000    { animation-delay: 2s; }
    .animation-delay-4000    { animation-delay: 4s; }
    .animate-fade-in         { animation: fade-in  0.6s ease-out both; }
    .animate-slide-up        { animation: slide-up 0.6s ease-out both; }
  `}</style>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [saved,      setSaved]      = useState(false);
  const [liked,      setLiked]      = useState(false);
  const [likeCount,  setLikeCount]  = useState(0);
  const [copied,     setCopied]     = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }

        const res  = await axios.get(`${BASE_URL}/api/experience/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data?.experience || res.data;
        setExperience(data);
        setLikeCount(data?.likes ?? data?.likeCount ?? 0);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "This experience could not be found."
            : "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchExperience();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLike = () => {
    setLiked((p) => !p);
    setLikeCount((p) => (liked ? p - 1 : p + 1));
  };

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
      <Blobs />
      <div className="text-center relative z-10">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading experience...</p>
      </div>
      <Styles />
    </div>
  );

  /* ── Error ── */
  if (error || !experience) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <Blobs />
      <GlassCard className="max-w-md w-full p-10 text-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-500 mb-6">{error ?? "Experience not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="group relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex items-center justify-center gap-2"
        >
          Go Back
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </GlassCard>
      <Styles />
    </div>
  );

  /* ── Derive values ── */
  const diff       = DIFFICULTY[experience.difficulty] ?? DIFFICULTY.Medium;
  const authorName = experience.user?.name ?? experience.author ?? "Anonymous";
  const authorInit = authorName[0]?.toUpperCase() ?? "A";
  const postedDate = experience.createdAt
    ? new Date(experience.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const rounds =
    Array.isArray(experience.rounds)
      ? experience.rounds
      : typeof experience.rounds === "number"
      ? Array.from({ length: experience.rounds }, (_, i) => ({ name: `Round ${i + 1}` }))
      : [];

  const skills =
    Array.isArray(experience.skills)
      ? experience.skills
      : typeof experience.skills === "string"
      ? experience.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  const tips =
    Array.isArray(experience.tips)
      ? experience.tips
      : experience.tips
      ? [experience.tips]
      : [];

  /* ── Render ── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Blobs />

      <div className="relative max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Top nav ── */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 p-3 rounded-xl hover:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 text-indigo-600 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="group flex items-center gap-2 p-3 rounded-xl hover:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Share2 className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">
                {copied ? "Copied!" : "Share"}
              </span>
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className="group flex items-center gap-2 p-3 rounded-xl hover:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              {saved
                ? <BookmarkCheck className="w-5 h-5 text-purple-600" />
                : <Bookmark className="w-5 h-5 text-indigo-600" />}
              <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">
                {saved ? "Saved" : "Save"}
              </span>
            </button>
          </div>
        </div>

        {/* ── Hero card ── */}
        <GlassCard className="mb-6 p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left */}
            <div className="flex items-start gap-5">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300 shrink-0">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                  {experience.company}
                </h1>
                <p className="flex items-center gap-1.5 text-gray-600 font-medium mt-1">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  {experience.role}
                </p>

                {/* Difficulty — mirrors ShareExperience card style */}
                <div className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl border-2 ${diff.bg} ${diff.border} ${diff.text} text-sm font-semibold`}>
                  <span className={`w-2 h-2 rounded-full ${diff.dot}`} />
                  {experience.difficulty}
                  <div className={`ml-1 w-10 h-1 rounded-full bg-gradient-to-r ${diff.bar} opacity-60`} />
                </div>

                {/* Extra tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {experience.type && (
                    <span className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded-full text-xs font-semibold">{experience.type}</span>
                  )}
                  {experience.college && (
                    <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full text-xs font-semibold">{experience.college}</span>
                  )}
                  {experience.year && (
                    <span className="px-3 py-1 bg-pink-50 border border-pink-200 text-pink-700 rounded-full text-xs font-semibold">Batch {experience.year}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Salary */}
            {experience.salary && (
              <div className="flex flex-col items-end shrink-0">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Package</p>
                <div className="flex items-center gap-1 mt-1">
                  <DollarSign className="w-6 h-6 text-green-500" />
                  <span className="text-3xl font-extrabold text-green-600">{experience.salary}</span>
                </div>
              </div>
            )}
          </div>

          {/* Author + like */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md hover:scale-110 transition-transform duration-300">
                {authorInit}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{authorName}</p>
                {postedDate && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" /> {postedDate}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleLike}
              className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 overflow-hidden ${
                liked
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              <ThumbsUp className={`w-4 h-4 transition-transform duration-300 ${liked ? "scale-125" : "group-hover:scale-110"}`} />
              Helpful · {likeCount}
              {liked && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          </div>
        </GlassCard>

        {/* ── Stat row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Users,        label: "Rounds",     value: rounds.length || experience.rounds || "—", grad: "from-indigo-500 to-purple-600" },
            { icon: TrendingUp,   label: "Difficulty", value: experience.difficulty ?? "—",               grad: "from-yellow-500 to-orange-500" },
            { icon: Star,         label: "Skills",     value: skills.length || "—",                       grad: "from-purple-500 to-pink-500"   },
            { icon: CheckCircle2, label: "Outcome",    value: experience.outcome ?? "Placed",             grad: "from-green-500 to-emerald-500" },
          ].map(({ icon: Icon, label, value, grad }, i) => (
            <GlassCard
              key={label}
              delay={i * 80}
              className="p-5 text-center flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-lg mb-2`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-extrabold text-gray-800">{value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
            </GlassCard>
          ))}
        </div>

        {/* ── Two-col body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">

            {experience.experience && (
              <GlassCard className="p-7">
                <SectionHeader icon={FileText} title="Experience Overview" />
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                  {experience.experience}
                </p>
              </GlassCard>
            )}

            {rounds.length > 0 && (
              <GlassCard className="p-7">
                <SectionHeader icon={Users} title="Interview Rounds" gradient="from-purple-500 to-pink-500" />
                {rounds.map((round, i) => (
                  <RoundAccordion key={i} round={round} index={i} />
                ))}
              </GlassCard>
            )}

            {tips.length > 0 && (
              <GlassCard className="p-7">
                <SectionHeader icon={Lightbulb} title="Tips for Aspirants" gradient="from-yellow-500 to-orange-500" />
                <ul className="space-y-4">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-yellow-50/60 rounded-2xl border border-yellow-100 hover:bg-yellow-50 transition-colors duration-200">
                      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-md">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {skills.length > 0 && (
              <GlassCard className="p-6">
                <SectionHeader icon={TrendingUp} title="Skills Required" gradient="from-green-500 to-emerald-500" />
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700 rounded-full text-sm font-medium hover:from-indigo-100 hover:to-purple-100 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            )}

            <GlassCard className="p-6">
              <SectionHeader icon={Building2} title="Quick Info" />
              <InfoRow icon={Building2}  label="Company"    value={experience.company} />
              <InfoRow icon={Briefcase}  label="Role"       value={experience.role} />
              <InfoRow icon={DollarSign} label="Package"    value={experience.salary} />
              <InfoRow icon={TrendingUp} label="Difficulty" value={experience.difficulty} />
              <InfoRow icon={Users}      label="Type"       value={experience.type} />
              <InfoRow icon={Building2}  label="College"    value={experience.college} />
              <InfoRow icon={Calendar}   label="Year"       value={experience.year} />
            </GlassCard>

            {experience.resources?.length > 0 && (
              <GlassCard className="p-6">
                <SectionHeader icon={Lightbulb} title="Resources" gradient="from-pink-500 to-purple-500" />
                <ul className="space-y-2">
                  {experience.resources.map((res, i) => (
                    <li key={i}>
                      {typeof res === "string" ? (
                        <span className="text-sm text-gray-700">{res}</span>
                      ) : (
                        <a href={res.url} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline">
                          {res.title ?? res.url}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* CTA — same button style as ShareExperience submit */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
                <h4 className="font-bold text-base mb-1">Got Placed? 🚀</h4>
                <p className="text-indigo-200 text-sm mb-4 leading-relaxed">
                  Share your journey and help fellow students crack their dream companies.
                </p>
                <button
                  onClick={() => navigate("/share-experience")}
                  className="group relative w-full bg-white text-indigo-700 font-semibold py-3 rounded-xl hover:bg-indigo-50 transition-all duration-300 hover:scale-[1.02] shadow-md overflow-hidden flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Share Your Experience
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-10 animate-fade-in">
          Your contribution helps the community grow stronger 💪 ·{" "}
          <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            PrepPilot
          </span>
        </p>
      </div>

      <Styles />
    </div>
  );
};

export default ExperienceDetails;