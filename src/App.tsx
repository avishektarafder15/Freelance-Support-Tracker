import React, { useState, useEffect } from 'react';
import { TrackerEntry, PlatformSession, CVSession, User, UserRole, MockInterviewSession } from './types';
import { mockData, mockSessions, mockCVSessions, mockUsers, mockMockInterviewSessions } from './data';
import { TrackerTable } from './components/TrackerTable';
import { SessionsTable } from './components/SessionsTable';
import { CVSessionsTable } from './components/CVSessionsTable';
import { MockSessionsTable } from './components/MockSessionsTable';
import { MentorsTable } from './components/MentorsTable';
import { CallersTable } from './components/CallersTable';
import { LayoutDashboard, Users, Clock, CheckCircle2, AlertCircle, CalendarRange, FileCheck, Phone, ShieldCheck, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [entries, setEntries] = useState<TrackerEntry[]>([]);
  const [sessions, setSessions] = useState<PlatformSession[]>([]);
  const [cvSessions, setCVSessions] = useState<CVSession[]>([]);
  const [mockInterviewSessions, setMockInterviewSessions] = useState<MockInterviewSession[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('ADMIN');
  const [currentView, setCurrentView] = useState<'tracker' | 'sessions' | 'cv-sessions' | 'mock-sessions' | 'mentors' | 'callers'>('tracker');

  useEffect(() => {
    // Load data from localStorage or use mock data
    const savedData = localStorage.getItem('freelance_tracker_data_v2');
    const savedSessions = localStorage.getItem('freelance_tracker_sessions_v2');
    const savedCVSessions = localStorage.getItem('freelance_tracker_cv_sessions_v2');
    const savedMockSessions = localStorage.getItem('freelance_tracker_mock_sessions_v2');
    const savedUsers = localStorage.getItem('freelance_tracker_users_v2');
    
    if (savedData && JSON.parse(savedData).length > 0) {
      setEntries(JSON.parse(savedData));
    } else {
      setEntries(mockData);
    }

    if (savedSessions && JSON.parse(savedSessions).length > 0) {
      setSessions(JSON.parse(savedSessions));
    } else {
      setSessions(mockSessions);
    }

    if (savedCVSessions && JSON.parse(savedCVSessions).length > 0) {
      setCVSessions(JSON.parse(savedCVSessions));
    } else {
      setCVSessions(mockCVSessions);
    }

    if (savedMockSessions && JSON.parse(savedMockSessions).length > 0) {
      setMockInterviewSessions(JSON.parse(savedMockSessions));
    } else {
      setMockInterviewSessions(mockMockInterviewSessions);
    }

    if (savedUsers && JSON.parse(savedUsers).length > 0) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(mockUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('freelance_tracker_data_v2', JSON.stringify(entries));
    localStorage.setItem('freelance_tracker_sessions_v2', JSON.stringify(sessions));
    localStorage.setItem('freelance_tracker_cv_sessions_v2', JSON.stringify(cvSessions));
    localStorage.setItem('freelance_tracker_mock_sessions_v2', JSON.stringify(mockInterviewSessions));
    localStorage.setItem('freelance_tracker_users_v2', JSON.stringify(users));
  }, [entries, sessions, cvSessions, mockInterviewSessions, users]);

  const handleResetData = () => {
    if (window.confirm('This will reset all data to the default Excel mock data. Continue?')) {
      setEntries(mockData);
      setSessions(mockSessions);
      setCVSessions(mockCVSessions);
      setMockInterviewSessions(mockMockInterviewSessions);
      setUsers(mockUsers);
      localStorage.setItem('freelance_tracker_data_v2', JSON.stringify(mockData));
      localStorage.setItem('freelance_tracker_sessions_v2', JSON.stringify(mockSessions));
      localStorage.setItem('freelance_tracker_cv_sessions_v2', JSON.stringify(mockCVSessions));
      localStorage.setItem('freelance_tracker_mock_sessions_v2', JSON.stringify(mockMockInterviewSessions));
      localStorage.setItem('freelance_tracker_users_v2', JSON.stringify(mockUsers));
    }
  };

  const handleAddUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9)
    };
    setUsers([...users, newUser]);
  };

  const handleUpdateEntry = (id: string, field: keyof TrackerEntry, value: any) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleAddEntry = () => {
    const newEntry: TrackerEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      name: 'New Entry',
      email: '',
      phone: '',
      courseName: '',
      enrollmentDate: '',
      profileLink: '',
      assistanceNeeded: '',
      isAvailableForSession: false,
      linkedinSupport: false,
      upworkSupport: false,
      fiverrSupport: false,
      cvImprovement: false,
      resumeWriting: false,
      mockInterview: false,
      schedulingCallTat: '',
    };
    setEntries([newEntry, ...entries]);
  };

  const handleAddSession = (sessionData: Omit<PlatformSession, 'id'>) => {
    const newSession: PlatformSession = {
      ...sessionData,
      id: `s-${Date.now()}`,
    };
    setSessions([newSession, ...sessions]);
  };

  // Stats calculations
  const totalEntries = entries.length;
  const linkedinReq = entries.filter(e => e.linkedinSupport).length;
  const upworkReq = entries.filter(e => e.upworkSupport).length;
  const cvReq = entries.filter(e => e.cvImprovement).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col z-20">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <LayoutDashboard size={24} />
            <span>TrackerPro</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {(userRole === 'ADMIN' || userRole === 'CALLER') && (
            <button 
              onClick={() => setCurrentView('tracker')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'tracker' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span>Freelance Support</span>
            </button>
          )}
          
          <button 
            onClick={() => setCurrentView('sessions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              currentView === 'sessions' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CalendarRange size={20} />
            <span>Platform Sessions</span>
          </button>

          {(userRole === 'ADMIN' || userRole === 'MENTOR') && (
            <button 
              onClick={() => setCurrentView('cv-sessions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'cv-sessions' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileCheck size={20} />
              <span>CV Sessions</span>
            </button>
          )}

          {(userRole === 'ADMIN' || userRole === 'MENTOR') && (
            <button 
              onClick={() => setCurrentView('mock-sessions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'mock-sessions' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare size={20} />
              <span>Mock Interview Sessions</span>
            </button>
          )}

          {(userRole === 'ADMIN' || userRole === 'MENTOR') && (
            <button 
              onClick={() => setCurrentView('mentors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'mentors' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span>Mentors</span>
            </button>
          )}

          {(userRole === 'ADMIN' || userRole === 'CALLER') && (
            <button 
              onClick={() => setCurrentView('callers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'callers' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Phone size={20} />
              <span>Callers</span>
            </button>
          )}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="bg-blue-600 rounded-xl p-4 text-white">
            <p className="text-xs opacity-80 mb-1">System Status</p>
            <p className="text-sm font-medium">All systems operational</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentView === 'tracker' ? 'Freelance Support Tracker' : 
               currentView === 'sessions' ? 'Platform Sessions History' : 
               currentView === 'cv-sessions' ? 'CV Improvement Sessions' :
               currentView === 'mock-sessions' ? 'Mock Interview Sessions' :
               currentView === 'mentors' ? 'Mentor Management' :
               'Caller Management'}
            </h1>
            <p className="text-gray-500">
              {currentView === 'tracker' 
                ? 'Manage and monitor freelance support requests from your students.' 
                : currentView === 'sessions' 
                ? 'Complete history of all platform support sessions scheduled.'
                : currentView === 'cv-sessions'
                ? 'History of CV improvement and mock interview sessions.'
                : currentView === 'mock-sessions'
                ? 'History of mock interview sessions.'
                : currentView === 'mentors'
                ? 'Track mentor performance and session allocation.'
                : 'Track caller performance and scheduling efficiency.'}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {/* Role Switcher */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1 mr-4">
              <ShieldCheck size={16} className="ml-2 text-blue-600" />
              <select 
                value={userRole}
                onChange={(e) => {
                  const newRole = e.target.value as UserRole;
                  setUserRole(newRole);
                  // Reset view if current view is not allowed for new role
                  if (newRole === 'CALLER' && (currentView === 'cv-sessions' || currentView === 'mock-sessions' || currentView === 'mentors')) {
                    setCurrentView('tracker');
                  } else if (newRole === 'MENTOR' && (currentView === 'tracker' || currentView === 'callers')) {
                    setCurrentView('sessions');
                  }
                }}
                className="bg-transparent border-none focus:ring-0 text-xs font-bold text-gray-700 pr-8"
              >
                <option value="ADMIN">ADMIN VIEW</option>
                <option value="CALLER">CALLER VIEW</option>
                <option value="MENTOR">MENTOR VIEW</option>
              </select>
            </div>

            <button 
              onClick={handleResetData}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Reset to Mock Data
            </button>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Sync
            </span>
            <span className="text-gray-400">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Requests', value: totalEntries, icon: Users, color: 'blue' },
            { label: 'LinkedIn Support', value: linkedinReq, icon: CheckCircle2, color: 'indigo' },
            { label: 'Upwork Support', value: upworkReq, icon: AlertCircle, color: 'amber' },
            { label: 'CV Improvement', value: cvReq, icon: LayoutDashboard, color: 'emerald' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-${stat.color}-50 text-${stat.color}-600 rounded-lg`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-xs font-medium text-gray-400">Real-time</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Section */}
        <section className="h-[calc(100vh-350px)] min-h-[500px]">
          {currentView === 'tracker' ? (
            <TrackerTable 
              entries={entries} 
              sessions={sessions}
              onUpdateEntry={handleUpdateEntry}
              onAddEntry={handleAddEntry}
              onAddSession={handleAddSession}
            />
          ) : currentView === 'sessions' ? (
            <SessionsTable sessions={sessions} />
          ) : currentView === 'cv-sessions' ? (
            <CVSessionsTable sessions={cvSessions} />
          ) : currentView === 'mock-sessions' ? (
            <MockSessionsTable sessions={mockInterviewSessions} />
          ) : currentView === 'mentors' ? (
            <MentorsTable 
              sessions={sessions} 
              cvSessions={cvSessions} 
              mockInterviewSessions={mockInterviewSessions}
              mentors={users.filter(u => u.role === 'MENTOR')}
              onAddMentor={(name, email) => handleAddUser({ name, email, role: 'MENTOR' })}
            />
          ) : (
            <CallersTable 
              sessions={sessions} 
              cvSessions={cvSessions} 
              mockInterviewSessions={mockInterviewSessions}
              callers={users.filter(u => u.role === 'CALLER')}
              onAddCaller={(name, email) => handleAddUser({ name, email, role: 'CALLER' })}
            />
          )}
        </section>
      </main>
    </div>
  );
}
