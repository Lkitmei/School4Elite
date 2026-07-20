import React, { useState } from "react";
import { Search, Star, Award, BookOpen, Clock, Calendar, CheckCircle, ChevronRight, X } from "lucide-react";
import { TUTORS } from "../data";
import { Tutor } from "../types";

export default function TutorSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  // Extract unique filter keys
  const subjects = ["All", "Humanities", "Science", "Math", "English Literature", "Physics"];
  const levels = ["All", "Intermediate", "Advanced", "Scholar"];

  const filteredTutors = TUTORS.filter((tutor) => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tutor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tutor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = subjectFilter === "All" || 
                           tutor.subjects.includes(subjectFilter) || 
                           tutor.subject.includes(subjectFilter);
    
    const matchesLevel = levelFilter === "All" || tutor.levels.includes(levelFilter);

    return matchesSearch && matchesSubject && matchesLevel;
  });

  return (
    <div id="tutor-search-page" className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-950 tracking-tight">Faculty Directory</h1>
          <p className="text-slate-500 mt-1">Connect with world-class academic mentors from Oxford, MIT, and Yale.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200/60 self-start md:self-auto">
          <Clock className="w-3.5 h-3.5" />
          <span>Active Mentors: {TUTORS.length}</span>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            id="tutor-search-input"
            type="text"
            placeholder="Search mentors by name, expertise, or research area..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            id="tutor-subject-select"
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="All">All Disciplines</option>
            {subjects.filter(s => s !== "All").map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="tutor-level-select"
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="All">All Student Levels</option>
            {levels.filter(l => l !== "All").map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tutor cards list */}
      {filteredTutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTutors.map((tutor) => (
            <div
              id={`tutor-card-${tutor.id}`}
              key={tutor.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                {/* Tutor Profile Header */}
                <div className="flex gap-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold mb-1">
                      {tutor.subject}
                    </span>
                    <h2 className="font-display text-xl font-bold text-slate-900 tracking-tight">{tutor.name}</h2>
                    <div className="flex items-center gap-1.5 mt-1 text-amber-500 text-sm">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="font-bold text-slate-800">{tutor.rating}</span>
                      <span className="text-slate-400">({tutor.reviews.length} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Tutor Bio Snippet */}
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {tutor.bio}
                </p>

                {/* Specializations & target levels */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.subjects.map((sub) => (
                      <span key={sub} className="text-xs bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded text-slate-500 font-mono">
                        {sub}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target Levels: {tutor.levels.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Action area */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Slots Available</span>
                </div>
                <button
                  id={`btn-view-profile-${tutor.id}`}
                  onClick={() => setSelectedTutor(tutor)}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition flex items-center gap-1"
                >
                  View Profile & Slots
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-xl p-12 text-center border border-dashed border-slate-200">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-slate-600 font-medium">No mentors match your search criteria.</p>
          <p className="text-slate-400 text-sm mt-1">Try broadening your subject filter or typing a different research topic.</p>
        </div>
      )}

      {/* Tutor Profile Modal */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl border border-slate-200 animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between relative">
              <div className="flex gap-4">
                <img
                  src={selectedTutor.avatar}
                  alt={selectedTutor.name}
                  className="w-20 h-20 rounded-2xl object-cover border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-slate-900 text-white rounded-full text-xs font-semibold mb-1.5">
                    {selectedTutor.subject}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-slate-950">{selectedTutor.name}</h2>
                  <div className="flex items-center gap-1.5 mt-1 text-amber-500 text-sm">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="font-bold text-slate-800">{selectedTutor.rating}</span>
                    <span className="text-slate-400">({selectedTutor.reviews.length} Parent Reviews)</span>
                  </div>
                </div>
              </div>
              <button
                id="btn-close-modal"
                onClick={() => setSelectedTutor(null)}
                className="p-1 rounded-lg hover:bg-slate-100 transition absolute right-6 top-6"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Biography */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-slate-900 text-base">Academic Bio</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{selectedTutor.bio}</p>
              </div>

              {/* Credentials & Qualifications */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-slate-900 text-base">Qualifications & Credentials</h3>
                <div className="space-y-2">
                  {selectedTutor.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-sm text-slate-600">
                      <CheckCircle className="w-4.5 h-4.5 text-slate-900 shrink-0 mt-0.5" />
                      <span>{qual}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Available Slots */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <h3 className="font-display font-bold text-slate-900 text-base flex items-center gap-1.5">
                  <Calendar className="w-4.5 h-4.5 text-slate-800" />
                  Weekly Available Class Slots
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTutor.availableSlots.map((slot, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews section */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-slate-900 text-base">Parent & Student Reviews</h3>
                <div className="space-y-3">
                  {selectedTutor.reviews.map((rev, idx) => (
                    <div key={idx} className="border border-slate-100 p-4 rounded-xl space-y-2 bg-slate-50/40">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-slate-800">{rev.author}</span>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex gap-1 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{rev.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
              <button
                id="btn-close-modal-footer"
                onClick={() => setSelectedTutor(null)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100 transition"
              >
                Close
              </button>
              <button
                id="btn-contact-tutor-modal"
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition"
                onClick={() => {
                  setSelectedTutor(null);
                  // Trigger redirect or navigate to support chat
                  const tabBtn = document.getElementById("nav-item-support");
                  if (tabBtn) tabBtn.click();
                }}
              >
                Inquire & Book Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
