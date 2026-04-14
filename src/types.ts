export interface PlatformSession {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  brand: string;
  platformType: 'LinkedIn' | 'Upwork' | 'Fiverr';
  scheduledBy: string;
  scheduledTimestamp: string;
  scheduledDate: string;
  scheduledTime: string;
  mentorAllocated: string;
  isGoogleMeetScheduled: boolean;
  googleMeetUrl: string;
  isCancelled: boolean;
  cancellationReason: string;
}

export interface CVSession {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  brand: string;
  sessionType: string;
  scheduledBy: string;
  scheduledTimestamp: string;
  scheduledDate: string;
  scheduledTime: string;
  mentorAllocated: string;
  isGoogleMeetScheduled: boolean;
  googleMeetUrl: string;
  recordingLink: string;
  isCancelled: boolean;
  cancellationReason: string;
  aiStatus: string;
  aiReport: string;
}

export interface MockInterviewSession extends CVSession {}

export interface TrackerEntry {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  courseName: string;
  enrollmentDate: string;
  profileLink: string;
  assistanceNeeded: string;
  isAvailableForSession: boolean;
  linkedinSupport: boolean;
  upworkSupport: boolean;
  fiverrSupport: boolean;
  cvImprovement: boolean;
  resumeWriting: boolean;
  mockInterview: boolean;
  schedulingCallTat: string;
}

export type UserRole = 'ADMIN' | 'MENTOR' | 'CALLER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type SortField = keyof TrackerEntry;
export type SortOrder = 'asc' | 'desc';
