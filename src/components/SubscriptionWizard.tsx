import React, { useState, useEffect } from "react";
import { CheckCircle, ShieldCheck, User, ListChecks, CreditCard, ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { COURSE_MODULES } from "../data";
import { CourseModule } from "../types";

interface SubscriptionWizardProps {
  preSelectedModuleId: string | null;
  onComplete: () => void;
}

export default function SubscriptionWizard({ preSelectedModuleId, onComplete }: SubscriptionWizardProps) {
  const [step, setStep] = useState(1);
  
  // Step 1: Student Profile state
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("Grade 11");
  const [targetLevel, setTargetLevel] = useState("Scholar");
  const [parentEmail, setParentEmail] = useState("");

  // Step 2: Module Selection state
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  // Step 3: Billing state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Success screen state
  const [isSuccess, setIsSuccess] = useState(false);

  // If a module was pre-selected from the Module Browser, auto-add it
  useEffect(() => {
    if (preSelectedModuleId) {
      setSelectedModules([preSelectedModuleId]);
      // Advance directly to step 2 if they have already provided a profile or want to select subjects first
      setStep(2);
    }
  }, [preSelectedModuleId]);

  // Handle module selections
  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter(mId => mId !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  // Calculate live aggregates
  const getSelectedModulesData = (): CourseModule[] => {
    return COURSE_MODULES.filter(mod => selectedModules.includes(mod.id));
  };

  const calculateSubtotal = () => {
    return getSelectedModulesData().reduce((sum, mod) => sum + mod.price, 0);
  };

  // Handle finalize registration
  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || selectedModules.length === 0) return;

    // Simulate appending payment in local storage
    const savedPayments = JSON.parse(localStorage.getItem("se_payments") || "[]");
    const newPayment = {
      id: "pay-" + Date.now(),
      amount: calculateSubtotal(),
      date: new Date().toISOString().split("T")[0],
      status: "Paid",
      description: `Registration - ${getSelectedModulesData().map(m => m.title).join(", ")}`
    };
    savedPayments.push(newPayment);
    localStorage.setItem("se_payments", JSON.stringify(savedPayments));

    setIsSuccess(true);
  };

  return (
    <div id="subscription-wizard" className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Wizard Step Progress Tracker */}
      {!isSuccess && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-center relative">
            {/* Background line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-0"></div>
            {/* Step progress line */}
            <div 
              className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-900 transition-all duration-300 -z-0"
              style={{ width: `${((step - 1) / 2) * 94}%` }}
            ></div>

            {/* Step 1 */}
            <button 
              onClick={() => step > 1 && setStep(1)}
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                step >= 1 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}
            >
              {step > 1 ? <CheckCircle className="w-5 h-5 text-emerald-400 fill-slate-900" /> : <User className="w-4 h-4" />}
            </button>

            {/* Step 2 */}
            <button 
              onClick={() => step > 2 && setStep(2)}
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                step >= 2 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}
              disabled={step < 2}
            >
              {step > 2 ? <CheckCircle className="w-5 h-5 text-emerald-400 fill-slate-900" /> : <ListChecks className="w-4 h-4" />}
            </button>

            {/* Step 3 */}
            <button 
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                step >= 3 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}
              disabled={step < 3}
            >
              <CreditCard className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 px-1">
            <span className={step >= 1 ? "text-slate-900 font-bold" : ""}>STUDENT PROFILE</span>
            <span className={step >= 2 ? "text-slate-900 font-bold" : ""}>MODULE SELECTION</span>
            <span className={step >= 3 ? "text-slate-900 font-bold" : ""}>CONFIRM & PAY</span>
          </div>
        </div>
      )}

      {/* SUCCESS SCREEN */}
      {isSuccess ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-6 animate-scale-in">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50 text-emerald-600">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-3xl font-bold text-slate-950 tracking-tight">Registration Complete!</h1>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Welcome to ScholarElite. Alexander's customized academic roadmap has been bootstrapped, and class links are now available.
            </p>
          </div>

          {/* Registration Details Summary */}
          <div className="bg-slate-50 rounded-xl p-5 border text-left max-w-md mx-auto space-y-4">
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">REGISTERED SCHOLAR</span>
              <p className="font-semibold text-slate-900 text-sm">{studentName || "Alexander Thorne"}</p>
              <p className="text-slate-500 text-xs">{studentGrade} • {targetLevel} difficulty level</p>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <span className="text-[10px] text-slate-400 font-mono uppercase">ACTIVE SUBJECTS ENROLLED</span>
              <div className="space-y-1.5 mt-1">
                {getSelectedModulesData().map(mod => (
                  <div key={mod.id} className="flex justify-between items-center text-xs">
                    <span className="text-slate-800 font-medium">{mod.title}</span>
                    <span className="font-mono text-slate-500">${mod.price}/mo</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-center font-bold text-slate-950 text-sm">
              <span>Monthly Subscription Total</span>
              <span className="font-mono">${calculateSubtotal()}/mo</span>
            </div>
          </div>

          <div className="flex gap-4 max-w-xs mx-auto pt-4">
            <button
              id="btn-registration-complete-done"
              onClick={onComplete}
              className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
            >
              Go to Student Portal
            </button>
          </div>
        </div>
      ) : (
        /* WIZARD FLOW STEPS */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          
          {/* STEP 1: Student Profile */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-950 tracking-tight">Student Profile Setup</h2>
                <p className="text-slate-500 text-sm mt-0.5">Please provide basic credentials of the scholar to customize tutoring loops.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">STUDENT'S FULL NAME</label>
                  <input
                    id="wizard-student-name"
                    type="text"
                    required
                    placeholder="e.g., Alexander Thorne"
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">GRADE / ACADEMIC LEVEL</label>
                  <select
                    id="wizard-student-grade"
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                    value={studentGrade}
                    onChange={(e) => setStudentGrade(e.target.value)}
                  >
                    <option value="Grade 9">Grade 9 (Freshman)</option>
                    <option value="Grade 10">Grade 10 (Sophomore)</option>
                    <option value="Grade 11">Grade 11 (Junior)</option>
                    <option value="Grade 12">Grade 12 (Senior)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">TARGET DIFFICULY TIER</label>
                  <select
                    id="wizard-student-level"
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                  >
                    <option value="Beginner">Beginner (Foundations)</option>
                    <option value="Intermediate">Intermediate (Core AP)</option>
                    <option value="Advanced">Advanced (Caliber AP / Dual Enrollment)</option>
                    <option value="Scholar">Scholar (Elite Competition / Collegiate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">PARENT CONTACT EMAIL</label>
                  <input
                    id="wizard-parent-email"
                    type="email"
                    required
                    placeholder="e.g., sarah.johnson@gmail.com"
                    className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  id="btn-wizard-next-1"
                  disabled={!studentName || !parentEmail}
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1 disabled:opacity-40"
                >
                  Next: Select Modules
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Module Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-950 tracking-tight">Select Monthly Subject Modules</h2>
                <p className="text-slate-500 text-sm mt-0.5">Choose one or more subjects to add to the student's monthly study cycle.</p>
              </div>

              {/* Module selection list */}
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {COURSE_MODULES.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`border p-4 rounded-xl cursor-pointer flex justify-between items-start transition ${
                        isChecked ? "border-slate-900 bg-slate-50/70" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        <input
                          id={`checkbox-mod-${mod.id}`}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // toggled on container div click
                          className="mt-1 accent-slate-950"
                        />
                        <div>
                          <div className="flex gap-2 items-center">
                            <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-semibold font-mono uppercase">{mod.code}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{mod.subject} • {mod.level}</span>
                          </div>
                          <h4 className="font-display font-bold text-slate-900 text-sm mt-1">{mod.title}</h4>
                          <p className="text-slate-500 text-xs mt-0.5 leading-tight line-clamp-1">{mod.description}</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-slate-900 shrink-0">${mod.price}/mo</span>
                    </div>
                  );
                })}
              </div>

              {/* Live aggregates */}
              <div className="bg-slate-50 rounded-xl p-4 border flex justify-between items-center text-xs">
                <div>
                  <p className="font-medium text-slate-800">Total Subjects Chosen: {selectedModules.length}</p>
                  <p className="text-slate-400">Cancel or update modules anytime from parent dashboard.</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">ESTIMATED TOTAL</span>
                  <span className="text-lg font-bold text-slate-950 font-mono">${calculateSubtotal()}/mo</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  id="btn-wizard-back-2"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-100 transition flex items-center gap-1 text-slate-500"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  id="btn-wizard-next-2"
                  disabled={selectedModules.length === 0}
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1 disabled:opacity-40"
                >
                  Next: Pay & Confirm
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Pay & Confirm */}
          {step === 3 && (
            <form onSubmit={handleFinalize} className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-950 tracking-tight">Checkout & Confirm Subscription</h2>
                <p className="text-slate-500 text-sm mt-0.5">Please provide credit card credentials. Invoices are dispatched on the 1st of each month.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Credit card inputs */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">CARDHOLDER NAME</label>
                    <input
                      id="card-name-input"
                      type="text"
                      required
                      placeholder="e.g., Sarah Johnson"
                      className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">CREDIT CARD NUMBER</label>
                    <input
                      id="card-number-input"
                      type="text"
                      required
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">EXPIRY DATE</label>
                      <input
                        id="card-expiry-input"
                        type="text"
                        required
                        placeholder="MM/YY"
                        className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">CVV CODE</label>
                      <input
                        id="card-cvv-input"
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-center text-[11px] text-slate-400 bg-slate-50 p-3 rounded-lg border">
                    <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0" />
                    <span>Your transactions are protected by 256-bit bank-grade encryption. ScholarElite does not store raw credit card credentials on server nodes.</span>
                  </div>
                </div>

                {/* Subtotal summary sidebar */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4">
                  <h4 className="font-display font-bold text-slate-900 text-sm">Order Summary</h4>
                  
                  <div className="space-y-2 max-h-[140px] overflow-y-auto border-b pb-3 text-xs text-slate-600">
                    {getSelectedModulesData().map(mod => (
                      <div key={mod.id} className="flex justify-between items-start gap-1">
                        <span className="font-medium text-slate-800 line-clamp-1">{mod.title}</span>
                        <span className="font-mono text-slate-500">${mod.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Monthly Tuition</span>
                      <span className="font-mono">${calculateSubtotal()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Invoicing Charge</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-950 pt-2 border-t text-sm">
                      <span>Total Invoice</span>
                      <span className="font-mono">${calculateSubtotal()}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  type="button"
                  id="btn-wizard-back-3"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-100 transition flex items-center gap-1 text-slate-500"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  id="btn-wizard-finalize"
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Complete Registration & Pay
                </button>
              </div>
            </form>
          )}

        </div>
      )}
    </div>
  );
}
