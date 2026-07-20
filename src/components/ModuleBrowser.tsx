import React, { useState } from "react";
import { Search, Compass, BookOpen, Clock, Tag, ChevronRight } from "lucide-react";
import { COURSE_MODULES, TUTORS } from "../data";

interface ModuleBrowserProps {
  onSelectRegister: (moduleId: string) => void;
}

export default function ModuleBrowser({ onSelectRegister }: ModuleBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSubject, setActiveSubject] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");

  const subjects = ["All", "Science", "Math", "Humanities", "Languages"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced", "Scholar"];

  const filteredModules = COURSE_MODULES.filter((mod) => {
    const matchesSearch = mod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mod.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = activeSubject === "All" || mod.subject === activeSubject;
    const matchesLevel = activeLevel === "All" || mod.level === activeLevel;

    return matchesSearch && matchesSubject && matchesLevel;
  });

  const getTutorName = (tutorId: string) => {
    return TUTORS.find((t) => t.id === tutorId)?.name || "Academic Faculty";
  };

  return (
    <div id="module-browser-page" className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-950 tracking-tight">Explore Syllabus Modules</h1>
          <p className="text-slate-500 mt-1">Select from modular, high-impact curriculum packages structured by Oxford and MIT scholars.</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-100 border px-3 py-1.5 rounded-lg self-start md:self-auto">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          <span>Available Classes: {COURSE_MODULES.length}</span>
        </div>
      </div>

      {/* Filters and search section */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="module-search-input"
              type="text"
              placeholder="Search curriculum modules by name, code, or keywords..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {/* Level Filter */}
            <select
              id="module-level-select"
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
              value={activeLevel}
              onChange={(e) => setActiveLevel(e.target.value)}
            >
              <option value="All">All Levels</option>
              {levels.filter(l => l !== "All").map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Horizontal Subject Toggles */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {subjects.map((subj) => (
            <button
              id={`subject-toggle-${subj}`}
              key={subj}
              onClick={() => setActiveSubject(subj)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                activeSubject === subj 
                  ? "bg-slate-950 border-slate-950 text-white" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {subj === "All" ? "All Subjects" : subj}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((mod) => (
            <div
              id={`module-card-${mod.id}`}
              key={mod.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between"
            >
              <div>
                {/* Module Visual Cover */}
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                  <img
                    src={mod.image}
                    alt={mod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subject and level badges absolute */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white font-mono text-[10px] font-bold rounded uppercase">
                      {mod.subject}
                    </span>
                    <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-sm text-slate-800 font-mono text-[10px] font-bold rounded uppercase">
                      {mod.level}
                    </span>
                  </div>
                  {/* Module code absolute bottom right */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/70 text-white px-2 py-0.5 rounded font-mono text-[10px]">
                    {mod.code}
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Led by {getTutorName(mod.tutorId)}
                  </span>
                  <h3 className="font-display font-bold text-slate-900 text-base leading-tight">
                    {mod.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {mod.description}
                  </p>
                </div>
              </div>

              {/* Card Footer with specifics and Register */}
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs mb-3 font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {mod.duration} ({mod.hoursPerWeek}h/wk)
                  </span>
                  <span className="font-bold text-slate-900 flex items-center gap-0.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                    ${mod.price}/mo
                  </span>
                </div>

                <button
                  id={`btn-register-module-${mod.id}`}
                  onClick={() => onSelectRegister(mod.id)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1"
                >
                  Register & Subscribe
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-xl p-12 border border-dashed border-slate-200 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">No curriculum modules match your search filters.</p>
          <p className="text-slate-400 text-xs mt-1">Try resetting the level filter or searching other key terms.</p>
        </div>
      )}
    </div>
  );
}
