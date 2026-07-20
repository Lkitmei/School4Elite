import React, { useState } from "react";
import { Download, FileText, CheckCircle, ChevronRight, Milestone, AlertCircle, Sparkles, MessageSquare, Users, BookOpen } from "lucide-react";
import { RESOURCE_FILES, ROADMAP, COURSE_MODULES } from "../data";
import { DiscussionEmbed, CommentCount } from "disqus-react";

export default function CurriculumJourney() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>("mod-2"); // Default to active 'Classical Physics'

  // Simulated download trigger
  const handleDownload = (fileId: string, fileName: string) => {
    setDownloadingId(fileId);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(fileName);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 1500);
  };

  // Find currently selected module for Disqus discussion
  const selectedModule = COURSE_MODULES.find(m => m.id === selectedModuleId) || COURSE_MODULES[0];

  // Stable article URL and identifier configs for Disqus
  const getDisqusConfig = (moduleId: string, moduleTitle: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://school4elite.com";
    return {
      url: `${origin}/journey?module=${moduleId}`,
      identifier: `module-${moduleId}`,
      title: moduleTitle,
      language: "ENG" // English as requested by user template
    };
  };

  const activeDisqusConfig = getDisqusConfig(selectedModule.id, selectedModule.title);

  // Units timeline for the active module
  const units = [
    { name: "Kinetic Vectors & Momentum Equations", status: "completed", progress: "100%" },
    { name: "Keplerian Gravitational Planes & Orbits", status: "completed", progress: "100%" },
    { name: "Simple Harmonic Oscillation & Particle Systems", status: "current", progress: "45%" },
    { name: "Vector Field Flux & Green's Boundary Conditions", status: "future", progress: "0%" }
  ];

  const pastModules = [
    { title: "Linear Rhetoric & Comparative Prose", code: "ENG-101", grade: "A+", date: "Q1 2026" },
    { title: "Single-Variable Integration Theory", code: "MAT-210", grade: "A", date: "Q2 2026" }
  ];

  return (
    <div id="curriculum-journey-container" className="space-y-8 animate-fade-in">
      
      {/* Upper Grid Layout */}
      <div id="curriculum-journey-page" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Current Active Module Unit breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">ACTIVE SYLLABUS SYNC</span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Syllabus Progression Units</h2>
              <p className="text-slate-500 text-sm mt-0.5">Currently tracking units for: <strong>Classical Physics & Mechanics C</strong></p>
            </div>

            <div className="space-y-4">
              {units.map((unit, idx) => (
                <div 
                  key={idx} 
                  className={`border p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                    unit.status === "current" ? "border-slate-900 bg-slate-50/50" : "border-slate-100"
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <div className="mt-0.5 shrink-0">
                      {unit.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : unit.status === "current" ? (
                        <span className="relative flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                            ▶
                          </span>
                        </span>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm">{unit.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Unit {idx + 1} of active mechanics block</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
                      <div 
                        className={`h-full rounded-full ${unit.status === "completed" ? "bg-emerald-500" : "bg-slate-900"}`} 
                        style={{ width: unit.progress }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-800 font-mono w-8">{unit.progress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources library cards */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-950">Resources & Library Vault</h2>
              <p className="text-slate-500 text-xs">Curated worksheets, vector reference equations, and grammar exegesis summaries.</p>
            </div>

            {downloadSuccess && (
              <div className="text-xs bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-200 flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Simulated download for: <strong>{downloadSuccess}</strong> initiated successfully.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RESOURCE_FILES.map((file) => (
                <div key={file.id} className="border border-slate-100 rounded-xl p-4 flex justify-between items-start bg-slate-50/30">
                  <div className="flex gap-3 items-start">
                    <FileText className="w-8 h-8 text-slate-400 shrink-0" />
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-xs line-clamp-2 leading-tight">{file.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">{file.size} • {file.category}</p>
                      <span className="text-[9px] bg-slate-100 text-slate-600 px-1 rounded block mt-1 w-max">{file.moduleName.split(" ")[0]}</span>
                    </div>
                  </div>

                  <button
                    id={`btn-download-${file.id}`}
                    onClick={() => handleDownload(file.id, file.name)}
                    disabled={downloadingId !== null}
                    className="p-2 bg-white hover:bg-slate-100 border rounded-lg text-slate-700 transition disabled:opacity-40"
                  >
                    <Download className={`w-3.5 h-3.5 ${downloadingId === file.id ? "animate-bounce" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Past modules transcript card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-950">Completed Modules Record</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pastModules.map((past, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl p-4 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <span className="text-[9px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-mono font-semibold">{past.code}</span>
                    <h4 className="font-display font-bold text-slate-900 text-xs mt-2">{past.title}</h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">{past.date} Completion</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block font-mono">GRADE</span>
                    <span className="text-lg font-bold text-emerald-800 font-mono">{past.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Yearly Roadmap timeline) */}
        <div className="space-y-6">
          
          {/* High-end vertical milestone timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-950 flex items-center gap-1.5">
                <Milestone className="w-5 h-5 text-slate-900" />
                Academic Roadmap 2026
              </h2>
              <p className="text-slate-500 text-xs mt-0.5">Chronological milestones mapped to college board requirements.</p>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 py-2">
              {ROADMAP.map((mile) => (
                <div key={mile.id} className="relative">
                  {/* Visual timeline circle node absolute */}
                  <span className="absolute -left-[31px] top-1 flex h-4 w-4">
                    {mile.status === "completed" ? (
                      <span className="inline-flex rounded-full h-4 w-4 bg-emerald-600 border-2 border-white flex items-center justify-center text-[8px] text-white">✓</span>
                    ) : mile.status === "current" ? (
                      <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-slate-950 border-2 border-white"></span>
                      </span>
                    ) : (
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-slate-200 border-2 border-white"></span>
                    )}
                  </span>

                  {/* Milestone details */}
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono font-bold tracking-wider ${
                      mile.status === "completed" ? "text-emerald-700" :
                      mile.status === "current" ? "text-slate-900" : "text-slate-400"
                    }`}>
                      {mile.quarter} {mile.status === "current" ? "• Active" : ""}
                    </span>
                    <h4 className="font-display font-bold text-slate-900 text-sm leading-tight">{mile.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{mile.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* DISQUS Academic Discussion Board & Study Circle Forum */}
      <div id="disqus-discussion-board" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 rounded-full text-[10px] font-mono font-bold text-slate-700">
              <Users className="w-3.5 h-3.5" />
              <span>STUDENT-FACULTY INTERACTIVE FEED</span>
            </span>
            <h2 className="font-display text-2xl font-bold text-slate-900">Elite Academic Discussion Forum</h2>
            <p className="text-slate-500 text-xs">
              Review syllabus questions, annotate research papers, and clarify concepts directly with Oxford & MIT faculty.
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-right flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">TOTAL DISCUSSIONS</span>
              <span className="text-xs font-bold text-slate-900">
                <CommentCount 
                  shortname="school4elite" 
                  config={getDisqusConfig(selectedModule.id, selectedModule.title)}
                >
                  Comments
                </CommentCount>
              </span>
            </div>
          </div>
        </div>

        {/* Topic Selector Tabs */}
        <div className="space-y-3">
          <label className="text-[11px] font-mono font-bold text-slate-400 block uppercase">CHOOSE DISCUSSION TOPIC (SYLLABUS MODULE)</label>
          <div className="flex flex-wrap gap-2">
            {COURSE_MODULES.map((m) => {
              const isActive = selectedModuleId === m.id;
              const moduleDisqusConfig = getDisqusConfig(m.id, m.title);
              return (
                <button
                  id={`btn-select-discuss-${m.id}`}
                  key={m.id}
                  onClick={() => setSelectedModuleId(m.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-2.5 ${
                    isActive 
                      ? "bg-slate-950 text-white border-slate-950 shadow-sm" 
                      : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>{m.title}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <CommentCount shortname="school4elite" config={moduleDisqusConfig}>
                      0 Comments
                    </CommentCount>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Disqus Comments Thread */}
        <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wide">
              Thread: <span className="text-slate-900 font-sans font-extrabold normal-case">{selectedModule.title}</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400 bg-white border px-2 py-0.5 rounded">
              Language: English (ENG)
            </span>
          </div>
          
          {/* Embedding Disqus thread */}
          <div id="disqus-thread-container" className="min-h-[400px]">
            <DiscussionEmbed
              shortname="school4elite"
              config={activeDisqusConfig}
            />
          </div>
        </div>

      </div>

    </div>
  );
}

