import React from "react";
import { Compass, Calendar, GraduationCap, Award, Landmark, BookOpen, Quote, ChevronRight, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "../data";

interface LandingPageProps {
  onNavigate: (tabId: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div id="landing-page" className="space-y-16 animate-fade-in pb-12">
      {/* Hero Block Section */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-900">
        {/* Background graphics decoration */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-slate-800/10 rounded-full filter blur-3xl -z-0"></div>
        <div className="absolute left-1/4 bottom-0 w-60 h-60 bg-slate-900/40 rounded-full filter blur-2xl -z-0"></div>

        <div className="max-w-xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 rounded-full text-xs font-mono font-bold border border-slate-800 text-slate-300">
            <GraduationCap className="w-3.5 h-3.5 text-slate-100" />
            <span>EXCELLENCE IN PEDAGOGY</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Cultivating the Elite Scholars of <span className="text-slate-200 underline decoration-slate-400">Tomorrow</span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            ScholarElite bridges ambitious students with distinguished mentors from Oxford, MIT, and Yale. We deliver rigorous calculus, advanced rhetoric, and physics loops calibrated to elite university admissions.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              id="btn-hero-explore"
              onClick={() => onNavigate("modules")}
              className="px-6 py-2.5 bg-white text-slate-950 rounded-xl text-xs font-bold hover:bg-slate-100 transition flex items-center gap-1"
            >
              Explore Modules
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
            <button
              id="btn-hero-tutors"
              onClick={() => onNavigate("tutors")}
              className="px-6 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
            >
              Meet the Faculty
            </button>
          </div>
        </div>
      </div>

      {/* University credentials logos strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-y border-slate-200 py-8">
        <div className="flex flex-col items-center gap-2">
          <Landmark className="w-7 h-7 text-slate-400" />
          <span className="font-display font-bold text-slate-800 text-sm">Oxford Standards</span>
          <p className="text-[10px] text-slate-400 font-mono">Literary prose structures</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Award className="w-7 h-7 text-slate-400" />
          <span className="font-display font-bold text-slate-800 text-sm">MIT Caliber Physics</span>
          <p className="text-[10px] text-slate-400 font-mono">Vector mechanics loops</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <GraduationCap className="w-7 h-7 text-slate-400" />
          <span className="font-display font-bold text-slate-800 text-sm">Yale Admissions Essay</span>
          <p className="text-[10px] text-slate-400 font-mono">Persuasive statement rhetoric</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BookOpen className="w-7 h-7 text-slate-400" />
          <span className="font-display font-bold text-slate-800 text-sm">Dual AP Curriculums</span>
          <p className="text-[10px] text-slate-400 font-mono">Structured milestones</p>
        </div>
      </div>

      {/* Bento Grid Core Value Propositions */}
      <div className="space-y-6">
        <div className="text-center max-w-md mx-auto space-y-1.5">
          <h2 className="font-display text-2xl font-bold text-slate-950">A Philosophy of Rigor</h2>
          <p className="text-slate-500 text-xs">Moving beyond simple tutoring to craft bespoke academic journeys.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 hover:border-slate-300 transition">
            <div className="w-10 h-10 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-display font-bold text-slate-900 text-base">Diagnostic Baseline</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Every student undergoes structured baseline testing to map cognitive gaps, calibration limits, and current AP scoring vectors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 hover:border-slate-300 transition">
            <div className="w-10 h-10 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-display font-bold text-slate-900 text-base">Elite Consultation</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Bi-weekly 1-on-1 loops direct from published PhD scholars who hold active research chairs and elite pedagogy credentials.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 hover:border-slate-300 transition">
            <div className="w-10 h-10 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-display font-bold text-slate-900 text-base">Interactive Roadmaps</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Chronological milestones tracking class attendance, homework queries, quiz grades, and overall progress loops in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Client Testimonials Carousel strip */}
      <div className="space-y-6">
        <div className="text-center max-w-md mx-auto">
          <h2 className="font-display text-xl font-bold text-slate-950">Approved by Families</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <div key={idx} className="bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between space-y-4">
              <Quote className="w-8 h-8 text-slate-200 fill-slate-100 shrink-0" />
              <p className="text-slate-600 text-xs italic leading-relaxed">"{test.quote}"</p>
              
              <div className="flex gap-3 items-center pt-2 border-t">
                <img
                  src={test.avatar}
                  alt={test.author}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-semibold text-xs text-slate-900">{test.author}</h4>
                  <span className="text-[10px] text-slate-400 block font-mono">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-end closing CTA bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-slate-900 text-base">Ready to align your child's academic future?</h3>
          <p className="text-slate-500 text-xs mt-0.5">Start with a 12-week customized subscription module.</p>
        </div>
        <button
          id="btn-cta-subscription"
          onClick={() => onNavigate("register")}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition"
        >
          Subscribe Scholar Level
        </button>
      </div>

    </div>
  );
}
