import React, { useState } from "react";
import { MessageSquare, Calendar, Users, BookOpen, ShieldAlert, Sparkles, Send, Award, Landmark, GraduationCap } from "lucide-react";
import { DiscussionEmbed, CommentCount } from "disqus-react";

interface SocialArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
}

export default function SocialForum() {
  // Define a curated list of academic discussion articles/topics
  const ARTICLES: SocialArticle[] = [
    {
      id: "essay-rhetoric-2026",
      title: "Rhetorical Persuasion & Elite Admissions Essay Frameworks",
      description: "How to craft a compelling intellectual narrative without falling into common clichés. Let's discuss standard Yale and Princeton prompt response structures.",
      url: typeof window !== "undefined" ? `${window.location.origin}/social/essay-rhetoric` : "https://school4elite.com/social/essay-rhetoric",
      category: "Admissions & Essays",
      author: "Dr. Elena Vance (Oxford Ph.D.)",
      authorRole: "Faculty Chair of English",
      date: "July 18, 2026"
    },
    {
      id: "quantum-mechanics-paradox",
      title: "Quantum Electrodynamics & Kinetic Vector Mechanics",
      description: "Resolving conservation of momentum paradoxes in non-inertial reference systems. Post your homework questions or study logs here.",
      url: typeof window !== "undefined" ? `${window.location.origin}/social/quantum-mechanics` : "https://school4elite.com/social/quantum-mechanics",
      category: "Theoretical Physics",
      author: "Dr. Markus Chen (MIT Ph.D.)",
      authorRole: "Faculty Chair of Science",
      date: "July 15, 2026"
    },
    {
      id: "analysis-fundamental-theorem",
      title: "Real Analysis: Proof Constructs for the Fundamental Theorem of Calculus",
      description: "A collaborative review of epsilon-delta limit validations. Share your proof step-by-steps for feedback from peers and mentors.",
      url: typeof window !== "undefined" ? `${window.location.origin}/social/real-analysis` : "https://school4elite.com/social/real-analysis",
      category: "Pure Mathematics",
      author: "Prof. Sandra Sterling",
      authorRole: "Guest Math Lecturer",
      date: "July 12, 2026"
    },
    {
      id: "oxford-tutorial-pedagogy",
      title: "The Oxford Tutorial System: Maximizing 1-on-1 Consultations",
      description: "Advice on pre-meeting preparation, defending essay theses orally, and responding to challenging counter-arguments under pressure.",
      url: typeof window !== "undefined" ? `${window.location.origin}/social/tutorial-system` : "https://school4elite.com/social/tutorial-system",
      category: "Academic Pedagogy",
      author: "Scholar Elite Admissions Team",
      authorRole: "Advising Council",
      date: "July 08, 2026"
    }
  ];

  const [selectedArticleId, setSelectedArticleId] = useState<string>(ARTICLES[0].id);

  // Retrieve current active article object
  const activeArticle = ARTICLES.find((art) => art.id === selectedArticleId) || ARTICLES[0];

  const disqusShortname = "school4elite";

  return (
    <div id="social-forum-container" className="space-y-8 animate-fade-in pb-12">
      {/* Premium Hub Header */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-900">
        <div className="absolute right-0 top-0 w-80 h-80 bg-slate-800/10 rounded-full filter blur-3xl -z-0"></div>
        <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-slate-900/30 rounded-full filter blur-2xl -z-0"></div>

        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 rounded-full text-xs font-mono font-bold border border-slate-800 text-slate-300">
            <Users className="w-3.5 h-3.5 text-slate-100" />
            <span>STUDENT-FACULTY SOCIAL DIALOGUE</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
            The Scholars Circle & Discussion Hub
          </h1>

          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            Welcome to the Elite Social Forum. Engage with fellow researchers and published faculty in high-caliber debates. We utilize live verified Disqus comments in <span className="text-slate-200 underline font-mono">English (ENG)</span> to coordinate scholarly interactions.
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Interactive Topic Selectors (5 Cols on large screen) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-display font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">
              Discussion Topics & Essays
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Select a thread below</span>
          </div>

          <div className="space-y-4">
            {ARTICLES.map((art) => {
              const isSelected = art.id === selectedArticleId;
              
              // Pre-calculate configuration for live comment counters
              const configForCounter = {
                url: art.url,
                id: art.id,
                title: art.title
              };

              return (
                <button
                  id={`btn-social-article-${art.id}`}
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                    isSelected
                      ? "bg-white border-slate-950 shadow-md ring-1 ring-slate-950"
                      : "bg-white hover:bg-slate-50 border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono uppercase ${
                        isSelected 
                          ? "bg-slate-950 text-white" 
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {art.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{art.date}</span>
                    </div>

                    <h4 className="font-display font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                      {art.title}
                    </h4>
                    
                    <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                      {art.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium truncate max-w-[150px]">{art.author}</span>
                    </div>

                    {/* Interactive Comment Counter for this specific topic */}
                    <div className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] flex items-center gap-1.5 ${
                      isSelected ? "bg-slate-100 text-slate-900" : "bg-slate-50 text-slate-500"
                    }`}>
                      <MessageSquare className="w-3 h-3 text-slate-400" />
                      <CommentCount
                        shortname={disqusShortname}
                        config={{
                          url: art.url,
                          identifier: art.id,
                          title: art.title
                        }}
                      >
                        Comments
                      </CommentCount>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Guidelines info card */}
          <div className="bg-slate-100/50 rounded-2xl border p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-800">
              <ShieldAlert className="w-4.5 h-4.5 text-slate-600 shrink-0" />
              <h4 className="text-xs font-bold font-display">Discussion Code of Conduct</h4>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              All threads are strictly moderated by Scholar Elite faculty. Avoid posting solved assignment sheets directly; guide fellow peers with theorems and exegesis models. Keep arguments courteous, academically robust, and intellectually honest.
            </p>
          </div>
        </div>

        {/* Right Side: Active Discussion Embed Frame (7 Cols on large screen) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            
            {/* Header info about the chosen topic */}
            <div className="space-y-4 border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase">
                  ACTIVE DISCUSSION THREAD
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-50 border px-2.5 py-0.5 rounded">
                  Locale: English (ENG)
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-lg sm:text-xl font-black text-slate-950 leading-tight">
                  {activeArticle.title}
                </h2>
                <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {activeArticle.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border flex items-center justify-center font-mono font-bold text-[10px]">
                    {activeArticle.author[4] || "SE"}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{activeArticle.author}</span>
                    <span className="text-[9px] text-slate-400 block font-mono">{activeArticle.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                  <span>ID: {activeArticle.id}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <CommentCount
                      shortname={disqusShortname}
                      config={{
                        url: activeArticle.url,
                        identifier: activeArticle.id,
                        title: activeArticle.title
                      }}
                    >
                      Comments
                    </CommentCount>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Live Disqus Thread Container */}
            <div id="active-disqus-embed-wrapper" className="min-h-[500px]">
              <DiscussionEmbed
                shortname={disqusShortname}
                config={{
                  url: activeArticle.url,
                  identifier: activeArticle.id,
                  title: activeArticle.title,
                  language: "ENG"
                }}
              />
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
