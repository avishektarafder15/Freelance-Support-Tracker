import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, AlertCircle, ExternalLink } from 'lucide-react';
import { PlatformSession } from '../types';

interface SessionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: PlatformSession[];
  studentName: string;
  platformType: string;
}

export const SessionDrawer: React.FC<SessionDrawerProps> = ({ 
  isOpen, 
  onClose, 
  sessions, 
  studentName,
  platformType 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-full max-w-[95vw] lg:max-w-[500px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{platformType} Sessions History</h2>
                <p className="text-sm text-gray-500">Student: <span className="font-medium text-gray-700">{studentName}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-3 text-xs">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Scheduled</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Cancelled</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {sessions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Calendar size={48} className="mb-4 opacity-20" />
                  <p>No sessions found for this platform.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                        session.isCancelled 
                          ? 'border-red-100 bg-red-50/30' 
                          : 'border-gray-100 bg-white hover:border-blue-100 hover:shadow-md'
                      }`}
                    >
                      {/* Status Bar */}
                      <div className={`h-1.5 w-full ${session.isCancelled ? 'bg-red-500' : 'bg-green-500'}`} />
                      
                      <div className="p-5">
                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                {session.platformType} Session
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                session.isCancelled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                              }`}>
                                {session.isCancelled ? 'Cancelled' : 'Scheduled'}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {session.scheduledDate} at {session.scheduledTime}
                            </h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Mentor</p>
                            <p className="text-sm font-bold text-blue-600">{session.mentorAllocated}</p>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Scheduled By</p>
                            <p className="text-sm text-gray-700 font-medium">{session.scheduledBy}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Source</p>
                            <p className="text-sm text-gray-700 font-medium">{session.source}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Brand</p>
                            <p className="text-sm text-gray-700 font-medium">{session.brand}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight mb-0.5">Timestamp</p>
                            <p className="text-xs text-gray-500 italic">{session.scheduledTimestamp}</p>
                          </div>
                        </div>

                        {/* Actions & Links */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            {session.googleMeetUrl ? (
                              <a 
                                href={session.googleMeetUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                              >
                                <ExternalLink size={16} />
                                Join Meeting
                              </a>
                            ) : (
                              <span className="text-xs text-gray-400 font-medium italic">No meeting link provided</span>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Student Contact</p>
                            <p className="text-xs text-gray-600">{session.phone}</p>
                          </div>
                        </div>

                        {/* Cancellation Reason */}
                        {session.isCancelled && session.cancellationReason && (
                          <div className="mt-4 p-3 bg-red-100/50 rounded-xl border border-red-100">
                            <div className="flex items-center gap-2 mb-1 text-red-700">
                              <AlertCircle size={14} />
                              <span className="text-[10px] font-bold uppercase">Cancellation Reason</span>
                            </div>
                            <p className="text-xs text-red-800 leading-relaxed">
                              {session.cancellationReason}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Total Sessions: <span className="font-bold text-gray-900">{sessions.length}</span>
              </div>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-sm"
              >
                Close Panel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
