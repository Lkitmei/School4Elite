import React, { useState, useEffect } from "react";
import { Calendar, CreditCard, Send, CheckCircle, Video, Play, Pause, ChevronLeft, ChevronRight, MessageSquare, Star, Upload, Info, Clock } from "lucide-react";
import { MOCK_PAYMENTS, TUTORS } from "../data";
import { Payment, FeedbackSubmission } from "../types";

export default function StudentPortal() {
  // State management
  const [payments, setPayments] = useState<Payment[]>([]);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackTutor, setFeedbackTutor] = useState(TUTORS[0].name);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Focus Learning state
  const [activeVideo, setActiveVideo] = useState({
    title: "Newtonian Orbital Kinetics - Vector Calculations",
    tutor: "Dr. Markus Chen",
    duration: "45 mins",
    isPlaying: false,
    progress: 42, // percent
  });

  // Calendar Booking Modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingTutor, setBookingTutor] = useState(TUTORS[0].name);
  const [bookingTopic, setBookingTopic] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Ask a Teacher state
  const [askTutor, setAskTutor] = useState(TUTORS[0].name);
  const [askQuestion, setAskQuestion] = useState("");
  const [askFile, setAskFile] = useState<string | null>(null);
  const [askSuccess, setAskSuccess] = useState(false);

  // Upcoming classes state
  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: "cls-1",
      title: "Newtonian Mechanics Vectors AP",
      tutor: "Dr. Markus Chen",
      date: "Today at 4:00 PM",
      link: "#",
      type: "Online Session"
    },
    {
      id: "cls-2",
      title: "Syntactic Prose Analysis Seminar",
      tutor: "Dr. Elena Vance",
      date: "Thursday at 3:00 PM",
      link: "#",
      type: "Group Review"
    }
  ]);

  useEffect(() => {
    // Load local storage payments or use initial
    const savedPayments = localStorage.getItem("se_payments");
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    } else {
      setPayments(MOCK_PAYMENTS);
      localStorage.setItem("se_payments", JSON.stringify(MOCK_PAYMENTS));
    }
  }, []);

  // Handle feedback submission
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim()) return;

    const submission: FeedbackSubmission = {
      id: "feed-" + Date.now(),
      studentName: "Alexander Thorne",
      tutorName: feedbackTutor,
      rating: feedbackRating,
      comment: feedbackComment,
      date: new Date().toISOString().split("T")[0]
    };

    // Store in local storage feedback stack
    const currentFeedback = JSON.parse(localStorage.getItem("se_feedback") || "[]");
    currentFeedback.push(submission);
    localStorage.setItem("se_feedback", JSON.stringify(currentFeedback));

    setFeedbackSuccess(true);
    setFeedbackComment("");
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  // Handle booking class date
  const handleConfirmBooking = () => {
    if (!selectedDay || !selectedSlot) return;

    const newClass = {
      id: "cls-" + Date.now(),
      title: bookingTopic || "1-on-1 Academic Consultation",
      tutor: bookingTutor,
      date: `July ${selectedDay}, 2026 at ${selectedSlot}`,
      link: "#",
      type: "Personal Class"
    };

    setUpcomingClasses([newClass, ...upcomingClasses]);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowBookingModal(false);
      setSelectedDay(null);
      setSelectedSlot("");
      setBookingTopic("");
    }, 2000);
  };

  // Handle Ask a Teacher submission
  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuestion.trim()) return;

    setAskSuccess(true);
    setAskQuestion("");
    setAskFile(null);
    setTimeout(() => setAskSuccess(false), 4000);
  };

  return (
    <div id="student-portal-page" className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
      {/* Left Column (2/3 width) */}
      <div className="xl:col-span-2 space-y-8">
        
        {/* Class Schedule and Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">STUDENT PORTAL</span>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">Academic Calendar & Schedule</h2>
            </div>
            <button
              id="btn-book-class-trigger"
              onClick={() => setShowBookingModal(true)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Class Date
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="border border-slate-200 p-4 rounded-xl flex flex-col justify-between hover:border-slate-300 transition">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{cls.type}</span>
                    <span className="flex items-center gap-1 text-slate-900 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                      <Clock className="w-3" />
                      {cls.date}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 mt-2 text-base leading-tight">{cls.title}</h3>
                  <p className="text-slate-500 text-xs mt-1">Instructor: {cls.tutor}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 font-mono">Live Video Session Ready</span>
                  <button className="px-3.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Join Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Learning: Interactive Video Screen */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">Focus Learning Hub</h2>
            <p className="text-slate-500 text-sm">Review recordings of your previous customized mentorship loops.</p>
          </div>

          <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative flex flex-col md:flex-row aspect-video md:aspect-auto md:h-64">
            {/* Visual Screen */}
            <div className="flex-1 bg-slate-900 relative flex items-center justify-center p-4 min-h-[160px]">
              {/* Overlay graphics */}
              <div className="absolute top-3 left-3 bg-red-600/90 text-white font-mono text-[10px] px-2 py-0.5 rounded uppercase font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                PREVIEW LOOP
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto cursor-pointer border border-white/20 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setActiveVideo({ ...activeVideo, isPlaying: !activeVideo.isPlaying })}>
                  {activeVideo.isPlaying ? <Pause className="w-6 h-6 text-white fill-current" /> : <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />}
                </div>
                <span className="text-xs text-white/50 block mt-2 font-mono">{activeVideo.duration} Loop Length</span>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                <div className="h-full bg-slate-200" style={{ width: `${activeVideo.progress}%` }}></div>
              </div>
            </div>

            {/* Video description sidebar */}
            <div className="w-full md:w-64 p-5 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between text-white">
              <div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">CURRENT LESSON</span>
                <h3 className="font-display font-semibold text-sm mt-1 text-slate-100">{activeVideo.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Taught by {activeVideo.tutor}</p>
              </div>

              <div className="space-y-2 pt-4 md:pt-0">
                <div className="text-[11px] text-slate-400 bg-slate-800 px-2 py-1 rounded">
                  💡 <strong>Core Focus:</strong> Isolate gravitational vectors across orbital planes.
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-slate-800 text-xs rounded hover:bg-slate-700 transition"
                    onClick={() => setActiveVideo({ ...activeVideo, progress: Math.max(0, activeVideo.progress - 10) })}>
                    Rewind
                  </button>
                  <button className="flex-1 py-1.5 bg-slate-800 text-xs rounded hover:bg-slate-700 transition"
                    onClick={() => setActiveVideo({ ...activeVideo, progress: Math.min(100, activeVideo.progress + 10) })}>
                    Forward
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Finance: Payment Records Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-slate-900">Finance & Invoicing</h2>
            <span className="text-xs text-slate-500 font-mono">Student ID: SE-901</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-mono text-slate-400">
                  <th className="pb-3 font-semibold">DESCRIPTION</th>
                  <th className="pb-3 font-semibold">DATE</th>
                  <th className="pb-3 font-semibold">AMOUNT</th>
                  <th className="pb-3 font-semibold text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {payments.map((pay) => (
                  <tr key={pay.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                    <td className="py-3 font-medium text-slate-800">{pay.description}</td>
                    <td className="py-3 text-slate-500">{pay.date}</td>
                    <td className="py-3 font-mono font-bold text-slate-800">${pay.amount}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        pay.status === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {pay.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Column (1/3 width) */}
      <div className="space-y-8">
        
        {/* Active Modules Progress cards */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-900">Enrolled Modules</h2>
          
          <div className="space-y-3">
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/40">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Science • PHY-301</span>
                <span className="text-xs font-bold text-slate-800">72% Completed</span>
              </div>
              <h4 className="font-display font-bold text-slate-900 text-sm mt-1">Classical Physics & Mechanics C</h4>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3">
                <div className="bg-slate-900 h-full rounded-full" style={{ width: "72%" }}></div>
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/40">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Math • MAT-502</span>
                <span className="text-xs font-bold text-slate-800">45% Completed</span>
              </div>
              <h4 className="font-display font-bold text-slate-900 text-sm mt-1">Multivariable Calculus & Analysis</h4>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3">
                <div className="bg-slate-900 h-full rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Feedback Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">Submit Mentor Feedback</h2>
            <p className="text-slate-500 text-xs">Help us calibrate our personalized mentorship loops.</p>
          </div>

          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">SELECT MENTOR</label>
              <select
                id="feedback-tutor-select"
                value={feedbackTutor}
                onChange={(e) => setFeedbackTutor(e.target.value)}
                className="w-full text-xs px-2.5 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
              >
                {TUTORS.map((tutor) => (
                  <option key={tutor.id} value={tutor.name}>{tutor.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">RATING</label>
              <div className="flex gap-1.5 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    className="focus:outline-none"
                  >
                    <Star className={`w-5 h-5 ${feedbackRating >= star ? "fill-current" : ""}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">COMMENT / NOTE</label>
              <textarea
                id="feedback-comment-textarea"
                rows={3}
                placeholder="Share your thoughts on recent session speed, clarity..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition resize-none"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
              ></textarea>
            </div>

            {feedbackSuccess && (
              <div className="text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Feedback submitted successfully. Thank you!</span>
              </div>
            )}

            <button
              id="btn-submit-feedback"
              type="submit"
              className="w-full py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Ask a Teacher Module */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <MessageSquare className="w-5 h-5 text-slate-800" />
              Ask a Teacher
            </h2>
            <p className="text-slate-500 text-xs">Stuck on an equation or concept? Submit questions or upload photos for expert advice.</p>
          </div>

          <form onSubmit={handleAskSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">SELECT TARGET TEACHER</label>
              <select
                id="ask-tutor-select"
                value={askTutor}
                onChange={(e) => setAskTutor(e.target.value)}
                className="w-full text-xs px-2.5 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
              >
                {TUTORS.map((t) => (
                  <option key={t.id} value={t.name}>{t.name} ({t.subject.split(" ")[0]})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">WRITE QUESTION</label>
              <textarea
                id="ask-question-textarea"
                rows={3}
                placeholder="E.g., How do we derive Green's theorem from line integrals in variable planes?"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition resize-none"
                value={askQuestion}
                onChange={(e) => setAskQuestion(e.target.value)}
              ></textarea>
            </div>

            {/* Drag & Drop File Upload Trigger */}
            <div className="border border-dashed border-slate-200 rounded-lg p-3 bg-slate-50 hover:bg-slate-100 transition cursor-pointer text-center relative">
              <input 
                type="file" 
                id="ask-file-upload" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAskFile(e.target.files[0].name);
                  }
                }}
              />
              <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
              <span className="text-[10px] text-slate-500 block font-medium">
                {askFile ? `Attached: ${askFile}` : "Drag & drop homework photo or Click to browse"}
              </span>
            </div>

            {askSuccess && (
              <div className="text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Question uploaded successfully. A tutor will reply shortly!</span>
              </div>
            )}

            <button
              id="btn-ask-submit"
              type="submit"
              className="w-full py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition"
            >
              Upload Inquiry
            </button>
          </form>
        </div>

      </div>

      {/* Book Class Date Modal (Screen 5 Calendar Selector) */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-200 animate-scale-in p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-slate-900 text-lg flex items-center gap-1.5">
                <Calendar className="w-5 h-5 text-slate-800" />
                Schedule Mentorship Class
              </h3>
              <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">×</button>
            </div>

            <div className="space-y-3">
              {/* Select Mentor */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">1. CHOOSE MENTOR</label>
                <select 
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded"
                  value={bookingTutor}
                  onChange={(e) => setBookingTutor(e.target.value)}
                >
                  {TUTORS.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Class Topic */}
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-semibold">2. LESSON TOPIC</label>
                <input 
                  type="text" 
                  placeholder="E.g. Preparing for Physics Mechanics AP exam"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:bg-white"
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                />
              </div>

              {/* Interactive Calendar grid of July 2026 */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1 px-1">
                  <span>July 2026</span>
                  <span>Select Date</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400 mb-1 border-b pb-1">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                {/* Simulated 28 days grid for July */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 28 }).map((_, idx) => {
                    const day = idx + 1;
                    const isAvailable = day % 3 !== 0; // Simulate some days are unavailable
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        key={day}
                        onClick={() => isAvailable && setSelectedDay(day)}
                        className={`py-1.5 rounded transition font-semibold ${
                          isSelected ? "bg-slate-900 text-white" : 
                          isAvailable ? "bg-slate-100 hover:bg-slate-200 text-slate-800" : "bg-slate-50 text-slate-300 cursor-not-allowed"
                        }`}
                        disabled={!isAvailable}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slots select */}
              {selectedDay && (
                <div className="animate-fade-in">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">3. SELECT SLOT</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["10:00 AM - 11:30 AM", "2:00 PM - 3:30 PM", "4:00 PM - 5:30 PM", "6:00 PM - 7:30 PM"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSlot(s)}
                        className={`py-1.5 px-2 border rounded text-[10px] text-center font-medium transition ${
                          selectedSlot === s ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bookingSuccess && (
                <div className="text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded border border-emerald-200 text-center font-semibold">
                  🎉 Class Booked Successfully!
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-2 border border-slate-200 rounded text-xs font-semibold hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDay || !selectedSlot}
                  className="flex-1 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
