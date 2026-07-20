import React, { useState } from "react";
import { Compass, Calendar, BookOpen, Clock, Landmark, GraduationCap, Users, MessageSquare, ChevronRight, Menu, X, Landmark as School, Sparkles, MapPin, Layers } from "lucide-react";
import LandingPage from "./components/LandingPage";
import TutorSearch from "./components/TutorSearch";
import ModuleBrowser from "./components/ModuleBrowser";
import StudentPortal from "./components/StudentPortal";
import ParentPortal from "./components/ParentPortal";
import CurriculumJourney from "./components/CurriculumJourney";
import SupportChat from "./components/SupportChat";
import SubscriptionWizard from "./components/SubscriptionWizard";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Cross-component coordination state
  const [preSelectedModuleId, setPreSelectedModuleId] = useState<string | null>(null);

  // Trigger registration wizard with a dynamic course pre-selected
  const handleRegisterModule = (moduleId: string) => {
    setPreSelectedModuleId(moduleId);
    setActiveTab("register");
  };

  // Callback once registration finishes
  const handleRegistrationComplete = () => {
    setPreSelectedModuleId(null);
    setActiveTab("student");
  };

  // Navigation Items
  const navItems = [
    { id: "home", label: "Home", icon: School },
    { id: "tutors", label: "Faculty Directory", icon: Users },
    { id: "modules", label: "Syllabus Modules", icon: Compass },
    { id: "register", label: "Subscribe", icon: Layers, badge: "New" },
    { id: "student", label: "Student Portal (Alex)", icon: GraduationCap },
    { id: "parent", label: "Parent Control (Sarah)", icon: Calendar },
    { id: "journey", label: "Curriculum Journey", icon: BookOpen },
    { id: "support", label: "Live Support Chat", icon: MessageSquare, badge: "Live" }
  ];

  return (
    <div id="scholar-elite-app" className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Dynamic Top Header with Premium Branding */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center border text-white shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-black text-slate-950 text-base tracking-tight flex items-center gap-1">
              SCHOLAR ELITE
              <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">ACADEMY</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">OXFORD • MIT • YALE SYLLABUS</p>
          </div>
        </div>

        {/* Desktop Navigation Row */}
        <nav className="hidden xl:flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                id={`nav-item-${item.id}`}
                key={item.id}
                onClick={() => {
                  if (item.id !== "register") {
                    setPreSelectedModuleId(null);
                  }
                  setActiveTab(item.id);
                }}
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? "bg-slate-950 text-white shadow-sm" 
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[8px] font-bold px-1 py-0.5 rounded font-mono ${
                    isActive ? "bg-white text-slate-950" : "bg-slate-950 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu trigger button */}
        <button
          id="btn-mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 xl:hidden rounded-lg hover:bg-slate-100 text-slate-800 transition"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Sidebar Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 xl:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-2xl p-6 flex flex-col justify-between animate-slide-in">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-slate-950 text-sm">Main Menu</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      id={`mobile-nav-item-${item.id}`}
                      key={item.id}
                      onClick={() => {
                        if (item.id !== "register") {
                          setPreSelectedModuleId(null);
                        }
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                        isActive 
                          ? "bg-slate-950 text-white shadow-md" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[8px] font-bold px-1 py-0.5 rounded font-mono ${
                          isActive ? "bg-white text-slate-950" : "bg-slate-950 text-white"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t pt-4 text-center">
              <span className="text-[10px] text-slate-400 font-mono">ScholarElite © 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Screen Content Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === "home" && <LandingPage onNavigate={(tabId) => setActiveTab(tabId)} />}
        
        {activeTab === "tutors" && <TutorSearch />}
        
        {activeTab === "modules" && (
          <ModuleBrowser onSelectRegister={handleRegisterModule} />
        )}
        
        {activeTab === "register" && (
          <SubscriptionWizard 
            preSelectedModuleId={preSelectedModuleId} 
            onComplete={handleRegistrationComplete} 
          />
        )}
        
        {activeTab === "student" && <StudentPortal />}
        
        {activeTab === "parent" && <ParentPortal />}
        
        {activeTab === "journey" && <CurriculumJourney />}
        
        {activeTab === "support" && <SupportChat />}
      </main>

      {/* Bottom Footer Section */}
      <footer className="bg-slate-950 border-t border-slate-900 text-white py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white text-slate-950 rounded-lg flex items-center justify-center font-bold">
              SE
            </div>
            <span className="font-display font-bold tracking-tight text-sm">SCHOLAR ELITE ACADEMY</span>
          </div>
          
          <div className="text-slate-500 text-[10px] font-mono text-center md:text-right">
            <span>Admin Control Panel: 3000 • Ingress Active</span>
            <span className="block mt-0.5">Dual AP, Oxford Standards & MIT Mechanics Curriculums</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
