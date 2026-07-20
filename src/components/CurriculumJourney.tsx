import React, { useState } from "react";
import { Download, FileText, CheckCircle, ChevronRight, Milestone, AlertCircle, Sparkles } from "lucide-react";
import { RESOURCE_FILES, ROADMAP } from "../data";

export default function CurriculumJourney() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Simulated download trigger
  const handleDownload = (fileId: string, fileName: string) => {
    setDownloadingId(fileId);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(fileName);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 1500);
  };

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
    <div id="curriculum-journey-page" className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      
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
  );
}
