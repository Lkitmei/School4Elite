import { Tutor, CourseModule, Student, Payment, Milestone, ResourceFile, SupportTicket } from "./types";

export const TUTORS: Tutor[] = [
  {
    id: "tutor-1",
    name: "Dr. Elena Vance",
    subject: "Humanities & English Literature",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
    bio: "Ph.D. in English Literature from Oxford University. With over 12 years of experience preparing elite students for top-tier university entrance, she specializes in literary analysis, critical writing, and college essays.",
    qualifications: [
      "Ph.D. in English Literature, Oxford University",
      "M.A. in Comparative Humanities, Yale University",
      "Recipient of the National Humanities Pedagogy Award"
    ],
    subjects: ["English Literature", "Critical Writing", "History of Art", "Philosophy"],
    levels: ["Advanced", "Scholar", "Intermediate"],
    rating: 4.9,
    reviews: [
      {
        author: "Sarah J. (Parent)",
        rating: 5,
        content: "Dr. Vance completely transformed Alistair's writing. His arguments are now clear, persuasive, and incredibly structured.",
        date: "2026-06-10"
      },
      {
        author: "Michael T. (Student)",
        rating: 5,
        content: "The literature reviews are deeply engaging. I felt so confident in my AP exams because of our deep dive sessions.",
        date: "2026-05-28"
      }
    ],
    availableSlots: ["Monday 4:00 PM - 5:30 PM", "Wednesday 3:00 PM - 4:30 PM", "Saturday 10:00 AM - 11:30 AM"]
  },
  {
    id: "tutor-2",
    name: "Dr. Markus Chen",
    subject: "Physics & Advanced Calculus",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
    bio: "Ph.D. in Theoretical Physics from MIT. Former research fellow with a passion for pedagogy. Dr. Chen translates complex mathematical constructs and physical models into digestible everyday dynamics.",
    qualifications: [
      "Ph.D. in Physics, MIT",
      "B.S. in Applied Mathematics, Caltech",
      "Published Researcher in Quantum Electrodynamics"
    ],
    subjects: ["Quantum Mechanics", "Calculus BC", "AP Physics C", "Linear Algebra"],
    levels: ["Scholar", "Advanced"],
    rating: 4.85,
    reviews: [
      {
        author: "Richard T. (Parent)",
        rating: 5,
        content: "Alexander's analytical skills skyrocketed. Calculus went from a source of stress to his favorite subject.",
        date: "2026-06-12"
      },
      {
        author: "Emma L. (Student)",
        rating: 4,
        content: "Markus explains things so visually! The free-body diagram analogy for orbital kinetics clicked instantly.",
        date: "2026-06-02"
      }
    ],
    availableSlots: ["Tuesday 4:30 PM - 6:00 PM", "Thursday 5:00 PM - 6:30 PM", "Saturday 1:00 PM - 2:30 PM"]
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "mod-1",
    title: "Advanced Literary Analysis & Prose",
    subject: "Humanities",
    level: "Scholar",
    description: "Deep dive into narrative structures, rhetorical devices, and historical contexts. Designed for high schoolers targeting top humanities programs.",
    tutorId: "tutor-1",
    price: 180,
    duration: "12 Weeks",
    hoursPerWeek: 3,
    code: "LIT-401",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "mod-2",
    title: "Classical Physics & Mechanics C",
    subject: "Science",
    level: "Advanced",
    description: "Rigorous vector calculus based study of Newtonian mechanics, work and energy, linear momentum, rotational dynamics, and planetary orbits.",
    tutorId: "tutor-2",
    price: 220,
    duration: "16 Weeks",
    hoursPerWeek: 4,
    code: "PHY-301",
    image: "https://images.unsplash.com/photo-1636466483364-351f1da582e5?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "mod-3",
    title: "Multivariable Calculus & Real Analysis",
    subject: "Math",
    level: "Scholar",
    description: "Exploring partial derivatives, multiple integrals, vector fields, Green's theorem, Stokes' theorem, and the fundamental limits of analysis.",
    tutorId: "tutor-2",
    price: 240,
    duration: "14 Weeks",
    hoursPerWeek: 4,
    code: "MAT-502",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "mod-4",
    title: "Rhetoric, Debate & College Admissions Essay",
    subject: "Humanities",
    level: "Advanced",
    description: "Mastering the art of written and spoken persuasion. Focus on drafting personal statements that resonate with elite university admissions.",
    tutorId: "tutor-1",
    price: 160,
    duration: "8 Weeks",
    hoursPerWeek: 2,
    code: "ENG-310",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "mod-5",
    title: "Advanced Data Structures & Algorithmic Analysis",
    subject: "Languages", // Putting as languages/CS
    level: "Scholar",
    description: "Explores complexity theory, dynamic programming, graph algorithms, and data layouts. Crucial preparation for collegiate computer science.",
    tutorId: "tutor-2",
    price: 210,
    duration: "12 Weeks",
    hoursPerWeek: 3,
    code: "CS-412",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600"
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "stud-1",
    name: "Alexander Thorne",
    grade: "Grade 11",
    targetLevel: "Scholar",
    enrolledModules: ["mod-2", "mod-3"]
  },
  {
    id: "stud-2",
    name: "Julian Thorne",
    grade: "Grade 9",
    targetLevel: "Advanced",
    enrolledModules: ["mod-1"]
  },
  {
    id: "stud-3",
    name: "Alistair Vance",
    grade: "Grade 12",
    targetLevel: "Scholar",
    enrolledModules: ["mod-1", "mod-4"]
  }
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay-1",
    amount: 220,
    date: "2026-07-15",
    status: "Paid",
    description: "Monthly Tuition Fee - Classical Physics C"
  },
  {
    id: "pay-2",
    amount: 240,
    date: "2026-07-01",
    status: "Paid",
    description: "Monthly Tuition Fee - Multivariable Calculus"
  },
  {
    id: "pay-3",
    amount: 180,
    date: "2026-08-01",
    status: "Pending",
    description: "Monthly Tuition Fee - Advanced Literary Analysis"
  },
  {
    id: "pay-4",
    amount: 220,
    date: "2026-06-15",
    status: "Paid",
    description: "Monthly Tuition Fee - Classical Physics C"
  }
];

export const ROADMAP: Milestone[] = [
  {
    id: "mile-1",
    quarter: "Q1 Milestone",
    title: "Foundational Diagnostic & Roadmap Sync",
    description: "Comprehensive diagnostic testing across mathematics and critical rhetoric to calibrate target thresholds and curate resources.",
    status: "completed"
  },
  {
    id: "mile-2",
    quarter: "Q2 Milestone",
    title: "Core Mechanics & Vector Analysis",
    description: "Mastery over AP Calculus limits and Newtonian orbital vectors. Draft 1 of the college application theme statement.",
    status: "completed"
  },
  {
    id: "mile-3",
    quarter: "Q3 Milestone (Current)",
    title: "Green's Theorem & Literary Exegesis",
    description: "Vector calculus fields integrations combined with structural comparative writing. Submitting mid-term diagnostics.",
    status: "current"
  },
  {
    id: "mile-4",
    quarter: "Q4 Milestone",
    title: "Mock Boards & College Essay Submission",
    description: "Full-length examination testing under exact timed conditions. Finalizing elite university application files.",
    status: "future"
  }
];

export const RESOURCE_FILES: ResourceFile[] = [
  {
    id: "file-1",
    name: "Advanced Vector Mechanics Formula Sheet.pdf",
    size: "2.4 MB",
    category: "Notes",
    moduleName: "Classical Physics & Mechanics C"
  },
  {
    id: "file-2",
    name: "Shakespearean Metre & Syntactic Exegesis Notes.pdf",
    size: "1.8 MB",
    category: "Notes",
    moduleName: "Advanced Literary Analysis & Prose"
  },
  {
    id: "file-3",
    name: "Line Integral & Boundary Conditions Worksheet.pdf",
    size: "920 KB",
    category: "Worksheet",
    moduleName: "Multivariable Calculus & Real Analysis"
  },
  {
    id: "file-4",
    name: "Common Rhetoric Fallacies and How to Isolate Them.pdf",
    size: "1.2 MB",
    category: "Worksheet",
    moduleName: "Rhetoric, Debate & College Admissions Essay"
  },
  {
    id: "file-5",
    name: "Full Academic Syllabus 2026-2027.pdf",
    size: "3.1 MB",
    category: "Syllabus",
    moduleName: "General"
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "tkt-1",
    subject: "Class schedule conflict next Thursday",
    status: "In Progress",
    tutorName: "Dr. Elena Vance",
    lastUpdated: "2 hours ago"
  },
  {
    id: "tkt-2",
    subject: "Physics exam diagnostics report requested",
    status: "Open",
    tutorName: "Dr. Markus Chen",
    lastUpdated: "5 hours ago"
  },
  {
    id: "tkt-3",
    subject: "Invoicing discrepancy for June math module",
    status: "Resolved",
    tutorName: "Sarah Johnson",
    lastUpdated: "3 days ago"
  }
];

export const TESTIMONIALS = [
  {
    quote: "ScholarElite's structured approach was the bridge Alexander needed to access Oxford's level of rigorous calculus.",
    author: "Sarah Johnson",
    role: "Parent of Alexander & Julian",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256"
  },
  {
    quote: "The personalized focus plan and direct access to scholars like Dr. Vance helped me structure my application essays with genuine clarity.",
    author: "Alexander Thorne",
    role: "Grade 11 Scholar",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256&h=256"
  }
];
