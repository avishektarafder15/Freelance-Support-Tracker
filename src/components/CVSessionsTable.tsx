import React, { useState } from 'react';
import { CVSession } from '../types';
import { Search, Filter, Download, ExternalLink, AlertCircle, CheckCircle2, FileText, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CVSessionsTableProps {
  sessions: CVSession[];
}

export const CVSessionsTable: React.FC<CVSessionsTableProps> = ({ sessions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSessions = sessions.filter(session => 
    session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.mentorAllocated.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.sessionType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header Actions */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search CV sessions by name, email, mentor..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[2200px]">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-20 border-r border-gray-200">Registered Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered Email</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">CV Session Type</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled By</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled Timestamp</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled Time</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mentor Allocated</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Google Meet?</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Meet URL</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recording Link</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cancelled?</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cancellation Reason</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence mode="popLayout">
              {filteredSessions.map((session) => (
                <motion.tr
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={session.id}
                  className={`hover:bg-gray-50/80 transition-colors ${session.isCancelled ? 'bg-red-50/30' : ''}`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                    {session.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{session.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{session.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{session.source}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{session.brand}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-medium">{session.sessionType}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 italic">{session.scheduledBy}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{session.scheduledTimestamp}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{session.scheduledDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{session.scheduledTime}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{session.mentorAllocated}</td>
                  <td className="px-4 py-3 text-sm">
                    {session.isGoogleMeetScheduled ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <CheckCircle2 size={14} /> Yes
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-400">
                        <AlertCircle size={14} /> No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {session.googleMeetUrl ? (
                      <a 
                        href={session.googleMeetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 truncate max-w-[150px]"
                      >
                        <ExternalLink size={14} />
                        Meet
                      </a>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {session.recordingLink ? (
                      <a 
                        href={session.recordingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline flex items-center gap-1 truncate max-w-[150px]"
                      >
                        <Video size={14} />
                        Recording
                      </a>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {session.isCancelled ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">YES</span>
                    ) : (
                      <span className="text-gray-300">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate" title={session.cancellationReason}>
                    {session.cancellationReason || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {session.aiStatus ? (
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        session.aiStatus === 'Completed' ? 'bg-green-50 text-green-700' :
                        session.aiStatus.includes('Failed') ? 'bg-red-50 text-red-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {session.aiStatus}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {session.aiReport && session.aiReport !== 'Not Available' ? (
                      <a 
                        href={session.aiReport} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline flex items-center gap-1 truncate max-w-[150px]"
                      >
                        <FileText size={14} />
                        Report
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">{session.aiReport || '-'}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredSessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <AlertCircle size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No CV sessions found matching your search.</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
        <div>Total CV Sessions: <span className="font-bold text-gray-700">{filteredSessions.length}</span></div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-100 border border-red-200 rounded"></div>
            <span>Cancelled Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};
