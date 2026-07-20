import React, { useState, useEffect, useRef } from "react";
import { Send, Upload, ShieldAlert, Check, Plus, Calendar, Clock, Smile, Sparkles } from "lucide-react";
import { TUTORS } from "../data";
import { SupportMessage } from "../types";

export default function SupportChat() {
  const [selectedTutor, setSelectedTutor] = useState("Dr. Elena Vance");
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversations from local storage or set default greetings
  useEffect(() => {
    const savedMessages = localStorage.getItem(`se_chat_${selectedTutor}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Setup initial greetings based on persona
      let initial: SupportMessage[] = [];
      if (selectedTutor === "Dr. Elena Vance") {
        initial = [
          {
            id: "greet-1",
            role: "model",
            content: "Greetings! I am Dr. Elena Vance. Welcome to your humanities mentorship space. How can I assist you with your prose structures or critical essays today?",
            timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            senderName: "Dr. Elena Vance"
          }
        ];
      } else if (selectedTutor === "Dr. Markus Chen") {
        initial = [
          {
            id: "greet-2",
            role: "model",
            content: "Hello! Dr. Markus Chen here. Ready to tackle some equations? Let me know if you are stuck on classical mechanics, kinematics, or any calculus limits!",
            timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            senderName: "Dr. Markus Chen"
          }
        ];
      } else {
        initial = [
          {
            id: "greet-3",
            role: "model",
            content: "Hi there! I am Sarah Johnson, your academic support administrator. Reach out to me with questions regarding course booking, tuition bills, schedules, or feedback syncs!",
            timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            senderName: "Sarah Johnson"
          }
        ];
      }
      setMessages(initial);
      localStorage.setItem(`se_chat_${selectedTutor}`, JSON.stringify(initial));
    }
  }, [selectedTutor]);

  // Scroll to bottom whenever messages list is appended
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedFileName) return;

    // Build the user message
    const userMsgContent = attachedFileName 
      ? `${inputText} [Attached File: ${attachedFileName}]`
      : inputText;

    const userMessage: SupportMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: userMsgContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: "Alexander Thorne (Student)"
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem(`se_chat_${selectedTutor}`, JSON.stringify(updatedMessages));
    setInputText("");
    setAttachedFileName(null);

    // Trigger typing indicator
    setIsTyping(true);

    try {
      // Map frontend messages to standard API model parameters
      const apiMessages = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          tutor: selectedTutor
        })
      });

      if (!response.ok) {
        throw new Error("Failed response from server endpoints");
      }

      const data = await response.json();
      
      const assistantMessage: SupportMessage = {
        id: "msg-" + Date.now() + "-reply",
        role: "model",
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderName: selectedTutor
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      localStorage.setItem(`se_chat_${selectedTutor}`, JSON.stringify(finalMessages));
    } catch (err) {
      console.error("Failed to query tutor chat service:", err);
      // Fallback message
      const errorMsg: SupportMessage = {
        id: "msg-err-" + Date.now(),
        role: "model",
        content: "I apologize, but my connection was temporarily interrupted. Let me double-check that equation and get back to you! Is there any other concept we can discuss?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderName: selectedTutor
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick prompt shortcuts to help the student test easily
  const quickPrompts = selectedTutor === "Dr. Elena Vance" 
    ? ["Can you review my thesis statement structure?", "How do I avoid comma splices in rhetorical prose?"]
    : selectedTutor === "Dr. Markus Chen"
    ? ["Can you explain Newton's third law in simple terms?", "Help me understand limits in Multivariable Calculus."]
    : ["How do I reschedule next Tuesday's mechanics class?", "I need an academic diagnostics report."];

  return (
    <div id="support-chat-page" className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-160px)] min-h-[500px] animate-fade-in">
      
      {/* Tutors & Contacts Sidebar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">Academic Counsel</h2>
            <p className="text-slate-500 text-xs mt-0.5">Select a mentor or support staff to launch a live consultation loop.</p>
          </div>

          <div className="space-y-2">
            {[
              { name: "Dr. Elena Vance", subject: "Humanities & prose", icon: "📚" },
              { name: "Dr. Markus Chen", subject: "Calculus & physics", icon: "📐" },
              { name: "Sarah Johnson", subject: "Support Administrator", icon: "⚙️" }
            ].map((contact) => (
              <button
                id={`chat-contact-${contact.name.replace(/\s+/g, "")}`}
                key={contact.name}
                onClick={() => setSelectedTutor(contact.name)}
                className={`w-full p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                  selectedTutor === contact.name 
                    ? "border-slate-900 bg-slate-50" 
                    : "border-slate-100 hover:border-slate-200 bg-white"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-slate-100 border flex items-center justify-center text-lg shrink-0">
                  {contact.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-bold text-slate-900 text-xs truncate">{contact.name}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{contact.subject}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Advisory badge */}
        <div className="bg-slate-50 p-3 rounded-xl border flex items-start gap-2 text-[10px] text-slate-400">
          <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>Tutors typically respond instantly during office hours (Monday - Friday 9 AM to 6 PM EST).</span>
        </div>
      </div>

      {/* Main Chat Interface Window */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
        {/* Chat Window Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
            <div>
              <h3 className="font-display font-bold text-slate-900 text-sm">{selectedTutor}</h3>
              <span className="text-[10px] text-slate-400 font-mono">Mentoring Loop Online</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-slate-800" />
            <span>AI Guided Sync</span>
          </div>
        </div>

        {/* Message bubbles canvas container */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/20 max-h-[360px] lg:max-h-none">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <span className="text-[10px] text-slate-400 font-mono mb-1">{msg.senderName} • {msg.timestamp}</span>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    isUser 
                      ? "bg-slate-950 text-white rounded-tr-none shadow-sm" 
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-slate-400 font-mono mb-1">{selectedTutor} is synthesizing...</span>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input box and actions footer panel */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          
          {/* Quick prompts row */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(prompt)}
                className="text-[10px] bg-slate-100 hover:bg-slate-200 border border-slate-200/50 px-2.5 py-1 rounded-full text-slate-600 whitespace-nowrap transition cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 items-center relative">
            <div className="relative flex-1">
              <input
                id="chat-message-input"
                type="text"
                placeholder={`Type a message to ${selectedTutor}...`}
                className="w-full pl-3 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              
              {/* File upload trigger */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <div className="relative cursor-pointer hover:bg-slate-200 p-1 rounded transition">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                </div>
                {attachedFileName && (
                  <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded border max-w-[60px] truncate" title={attachedFileName}>
                    {attachedFileName}
                  </span>
                )}
              </div>
            </div>

            <button
              id="btn-chat-send"
              type="submit"
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition shrink-0 flex items-center justify-center gap-1"
            >
              <Send className="w-3 h-3" />
              Send
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
