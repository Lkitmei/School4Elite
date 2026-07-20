export interface Tutor {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  bio: string;
  qualifications: string[];
  subjects: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  availableSlots: string[];
}

export interface Review {
  author: string;
  rating: number;
  content: string;
  date: string;
}

export interface CourseModule {
  id: string;
  title: string;
  subject: string;
  level: string;
  description: string;
  tutorId: string;
  price: number;
  duration: string;
  hoursPerWeek: number;
  code: string;
  image: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  targetLevel: string;
  enrolledModules: string[];
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending" | "Overdue";
  description: string;
}

export interface SupportMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
  senderName: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  tutorName: string;
  lastUpdated: string;
}

export interface FeedbackSubmission {
  id: string;
  studentName: string;
  tutorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Milestone {
  id: string;
  quarter: string;
  title: string;
  description: string;
  status: "completed" | "current" | "future";
}

export interface ResourceFile {
  id: string;
  name: string;
  size: string;
  category: "Notes" | "Worksheet" | "Syllabus";
  moduleName: string;
}
