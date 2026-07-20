import React, { useState } from "react";
import { Users, BookOpen, Clock, BarChart2, MessageSquare, Plus, Ticket, HelpCircle, CheckCircle, ChevronRight, HelpCircle as HelpIcon } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TUTORS, MOCK_TICKETS } from "../data";
import { SupportTicket } from "../types";

export default function ParentPortal() {
  const [activeStudent, setActiveStudent] = useState("Alexander");
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  
  // New ticket state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketTutor, setTicketTutor] = useState(TUTORS[0].name);

  // Student specific datasets for dynamic rendering
  const studentData: Record<string, {
    grade: string;
    attendance: string;
    averageScore: string;
    modules: string[];
    messages: { sender: string; avatar: string; text: string; date: string }[];
    chartData: { name: string; score: number; average: number }[];
  }> = {
    Alexander: {
      grade: "Grade 11 Scholar",
      attendance: "98.2%",
      averageScore: "91.5%",
      modules: ["Classical Physics & Mechanics C", "Multivariable Calculus & Real Analysis"],
      messages: [
        {
          sender: "Dr. Markus Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
          text: "Alexander completely nailed the vector orbital derivation today! His application of vector products in celestial planes is phenomenal.",
          date: "Yesterday"
        },
        {
          sender: "Sarah Johnson (Support)",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
          text: "Hi Sarah, Alexander's payment for July math modules was processed successfully. Thank you!",
          date: "3 days ago"
        }
      ],
      chartData: [
        { name: "Quiz 1", score: 84, average: 75 },
        { name: "Quiz 2", score: 90, average: 77 },
        { name: "Midterm", score: 88, average: 78 },
        { name: "Quiz 3", score: 93, average: 80 },
        { name: "Quiz 4", score: 96, average: 81 },
        { name: "Mock AP", score: 92, average: 82 }
      ]
    },
    Julian: {
      grade: "Grade 9 Advanced",
      attendance: "95.6%",
      averageScore: "84.8%",
      modules: ["Advanced Data Structures & Algorithms"],
      messages: [
        {
          sender: "Dr. Markus Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
          text: "Julian is adapting well to basic pointer arrays. Let's make sure he finishes the binary heap worksheets before Friday's loop.",
          date: "2 days ago"
        }
      ],
      chartData: [
        { name: "Quiz 1", score: 78, average: 75 },
        { name: "Quiz 2", score: 80, average: 77 },
        { name: "Midterm", score: 85, average: 78 },
        { name: "Quiz 3", score: 83, average: 80 },
        { name: "Quiz 4", score: 89, average: 81 },
        { name: "Mock Final", score: 88, average: 82 }
      ]
    },
    Alistair: {
      grade: "Grade 12 Scholar",
      attendance: "100%",
      averageScore: "95.2%",
      modules: ["Advanced Literary Analysis & Prose", "Rhetoric, Debate & College Essays"],
      messages: [
        {
          sender: "Dr. Elena Vance",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
          text: "Alistair has made tremendous progress in his debate rebuttals. His comparative essays are now structural masterpieces.",
          date: "Monday"
        },
        {
          sender: "Dr. Elena Vance",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
          text: "Alistair's draft for Oxford entrance essay is remarkably strong. I left line-by-line annotations in his workspace.",
          date: "1 week ago"
        }
      ],
      chartData: [
        { name: "Essay 1", score: 92, average: 82 },
        { name: "Debate 1", score: 94, average: 84 },
        { name: "Rhetoric", score: 91, average: 83 },
        { name: "Essay 2", score: 95, average: 85 },
        { name: "Mock Test", score: 98, average: 86 }
      ]
    }
  };

  const current = studentData[activeStudent];

  // Handle support ticket submit
  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;

    const newTicket: SupportTicket = {
      id: "tkt-" + Date.now(),
      subject: ticketSubject,
      status: "Open",
      tutorName: ticketTutor,
      lastUpdated: "Just now"
    };

    setTickets([newTicket, ...tickets]);
    setTicketSubject("");
    setShowAddTicketModal(false);
  };

  return (
    <div id="parent-portal-page" className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-950 tracking-tight">Parent Portal</h1>
          <p className="text-slate-500 mt-1">Manage active modules, read direct tutor feedback logs, and monitor real-time academic growth.</p>
        </div>
        
        {/* Student selector switcher */}
        <div className="flex bg-slate-100 border p-1 rounded-xl gap-1 self-start md:self-auto">
          {Object.keys(studentData).map((student) => (
            <button
              id={`student-switch-${student}`}
              key={student}
              onClick={() => setActiveStudent(student)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeStudent === student 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {student}
            </button>
          ))}
        </div>
      </div>

      {/* Stats summary indicators row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">ACADEMIC PATHWAY</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{current.grade}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">CLASS ATTENDANCE RATE</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{current.attendance} Present</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">DIAGNOSTIC TEST AVERAGE</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{current.averageScore}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main column: Recharts Growth Chart and Tutor log */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recharts chart card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-950">Academic Progress Curve</h2>
              <p className="text-slate-500 text-xs">Tracking performance milestones compared to global ScholarElite averages.</p>
            </div>

            {/* Recharts Container */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={current.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#94a3b8" />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 10, fontFamily: 'monospace' }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'sans-serif' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'sans-serif' }} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    name={`${activeStudent}'s Score`} 
                    stroke="#0f172a" 
                    strokeWidth={3} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="average" 
                    name="Global Scholar Average" 
                    stroke="#94a3b8" 
                    strokeWidth={1.5} 
                    strokeDasharray="4 4" 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Direct Communication Log Feed */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-950 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-slate-800" />
              Direct Tutor Logs
            </h2>

            <div className="space-y-4">
              {current.messages.map((msg, idx) => (
                <div key={idx} className="flex gap-4 items-start border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-xs text-slate-900">{msg.sender}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.date}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar: Active modules checklist and support ticketing */}
        <div className="space-y-8">
          
          {/* Currently registered subjects list */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-950">Active Modules Enrolled</h2>
            <div className="space-y-2">
              {current.modules.map((mod, idx) => (
                <div key={idx} className="border border-slate-100 p-3 rounded-xl bg-slate-50/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                    <span className="text-xs font-semibold text-slate-800">{mod}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Support Ticket Centre */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-slate-950 flex items-center gap-1.5">
                <Ticket className="w-4.5 h-4.5 text-slate-800" />
                Support Tickets
              </h2>
              <button
                id="btn-add-ticket-trigger"
                onClick={() => setShowAddTicketModal(true)}
                className="p-1 text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {tickets.map((tkt) => (
                <div key={tkt.id} className="border border-slate-100 rounded-xl p-3.5 space-y-2 bg-slate-50/40 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900 line-clamp-1 pr-1">{tkt.subject}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                      tkt.status === "Open" ? "bg-red-100 text-red-800" :
                      tkt.status === "In Progress" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {tkt.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>Tutor Assigned: {tkt.tutorName}</span>
                    <span>{tkt.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Add Ticket Modal */}
      {showAddTicketModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddTicket} className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-scale-in">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-display font-bold text-slate-900 text-base">File New Support Ticket</h3>
              <button type="button" onClick={() => setShowAddTicketModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">×</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">SUPPORT SUBJECT</label>
                <input
                  id="ticket-subject-input"
                  type="text"
                  required
                  placeholder="E.g., Changing schedule on Tuesday mechanics loop..."
                  className="w-full text-xs px-2.5 py-2 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">SELECT CORRESPONDING TUTOR</label>
                <select
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded"
                  value={ticketTutor}
                  onChange={(e) => setTicketTutor(e.target.value)}
                >
                  {TUTORS.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                  <option value="Sarah Johnson">Sarah Johnson (Support Admin)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTicketModal(false)}
                  className="flex-1 py-2 border rounded text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
                >
                  Open Ticket
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
