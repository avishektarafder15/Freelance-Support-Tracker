import React from 'react';
import { TrackerEntry, PlatformSession } from '../types';
import { EditableCell } from './EditableCell';
import { ActionCell } from './ActionCell';
import { SessionDrawer } from './SessionDrawer';
import { AddSessionModal } from './AddSessionModal';
import { Search, Plus, Download, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrackerTableProps {
  entries: TrackerEntry[];
  sessions: PlatformSession[];
  onUpdateEntry: (id: string, field: keyof TrackerEntry, value: any) => void;
  onAddEntry: () => void;
  onAddSession: (session: Omit<PlatformSession, 'id'>) => void;
}

export const TrackerTable: React.FC<TrackerTableProps> = ({ 
  entries, 
  sessions,
  onUpdateEntry, 
  onAddEntry,
  onAddSession
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortField, setSortField] = React.useState<keyof TrackerEntry>('timestamp');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');

  // Drawer & Modal State
  const [drawerConfig, setDrawerConfig] = React.useState<{
    isOpen: boolean;
    studentId: string;
    studentName: string;
    platformType: string;
  }>({ isOpen: false, studentId: '', studentName: '', platformType: '' });

  const [modalConfig, setModalConfig] = React.useState<{
    isOpen: boolean;
    studentId: string;
    studentName: string;
    platformType: string;
  }>({ isOpen: false, studentId: '', studentName: '', platformType: '' });

  const filteredEntries = entries
    .filter(entry => 
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (field: keyof TrackerEntry) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: keyof TrackerEntry }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  const handleViewSessions = (studentId: string, studentName: string, platformType: string) => {
    setDrawerConfig({ isOpen: true, studentId, studentName, platformType });
  };

  const handleAddSessionClick = (studentId: string, studentName: string, platformType: string) => {
    setModalConfig({ isOpen: true, studentId, studentName, platformType });
  };

  const filteredSessions = sessions.filter(s => 
    String(s.studentId) === String(drawerConfig.studentId) && 
    s.platformType === drawerConfig.platformType
  );

  console.log('Drawer Config:', drawerConfig);
  console.log('Total Sessions:', sessions.length);
  console.log('Filtered Sessions:', filteredSessions);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header Actions */}
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={18} />
            <span>Export</span>
          </button>
          <button 
            onClick={onAddEntry}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>Add Entry</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[1800px]">
          <thead>
            <tr className="bg-gray-100/80 sticky top-0 z-10">
              {[
                { label: 'Timestamp', field: 'timestamp' },
                { label: 'Name', field: 'name' },
                { label: 'Email', field: 'email' },
                { label: 'Phone', field: 'phone' },
                { label: 'Course', field: 'courseName' },
                { label: 'Enrollment', field: 'enrollmentDate' },
                { label: 'Profile Link', field: 'profileLink' },
                { label: 'Assistance', field: 'assistanceNeeded' },
                { label: 'Available', field: 'isAvailableForSession' },
                { label: 'LinkedIn', field: 'linkedinSupport' },
                { label: 'Upwork', field: 'upworkSupport' },
                { label: 'Fiverr', field: 'fiverrSupport' },
                { label: 'CV Imp.', field: 'cvImprovement' },
                { label: 'Resume', field: 'resumeWriting' },
                { label: 'Mock Int.', field: 'mockInterview' },
                { label: 'TAT', field: 'schedulingCallTat' },
              ].map((col) => (
                <th 
                  key={col.field}
                  onClick={() => handleSort(col.field as keyof TrackerEntry)}
                  className="p-3 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors border-b border-gray-200"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon field={col.field as keyof TrackerEntry} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence mode="popLayout">
              {filteredEntries.map((entry) => (
                <motion.tr 
                  key={entry.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="border-r border-gray-100">
                    <EditableCell value={entry.timestamp} type="text" onSave={(val) => onUpdateEntry(entry.id, 'timestamp', val)} />
                  </td>
                  <td className="border-r border-gray-100">
                    <EditableCell value={entry.name} type="text" onSave={(val) => onUpdateEntry(entry.id, 'name', val)} className="font-medium text-gray-900" />
                  </td>
                  <td className="border-r border-gray-100">
                    <EditableCell value={entry.email} type="text" onSave={(val) => onUpdateEntry(entry.id, 'email', val)} />
                  </td>
                  <td className="border-r border-gray-100">
                    <EditableCell value={entry.phone} type="text" onSave={(val) => onUpdateEntry(entry.id, 'phone', val)} />
                  </td>
                  <td className="border-r border-gray-100">
                    <EditableCell value={entry.courseName} type="text" onSave={(val) => onUpdateEntry(entry.id, 'courseName', val)} />
                  </td>
                  <td className="border-r border-gray-100">
                    <EditableCell value={entry.enrollmentDate} type="text" onSave={(val) => onUpdateEntry(entry.id, 'enrollmentDate', val)} />
                  </td>
                  <td className="border-r border-gray-100">
                    <EditableCell value={entry.profileLink} type="link" onSave={(val) => onUpdateEntry(entry.id, 'profileLink', val)} />
                  </td>
                  <td className="border-r border-gray-100 min-w-[200px]">
                    <EditableCell value={entry.assistanceNeeded} type="text" onSave={(val) => onUpdateEntry(entry.id, 'assistanceNeeded', val)} />
                  </td>
                  
                  {/* Action Cells (Uneditable dropdowns) */}
                  <td className="border-r border-gray-100">
                    <ActionCell 
                      value={entry.isAvailableForSession} 
                      onView={() => handleViewSessions(entry.id, entry.name, 'General')}
                      onAdd={() => handleAddSessionClick(entry.id, entry.name, 'General')}
                    />
                  </td>
                  <td className="border-r border-gray-100">
                    <ActionCell 
                      value={entry.linkedinSupport} 
                      onView={() => handleViewSessions(entry.id, entry.name, 'LinkedIn')}
                      onAdd={() => handleAddSessionClick(entry.id, entry.name, 'LinkedIn')}
                    />
                  </td>
                  <td className="border-r border-gray-100">
                    <ActionCell 
                      value={entry.upworkSupport} 
                      onView={() => handleViewSessions(entry.id, entry.name, 'Upwork')}
                      onAdd={() => handleAddSessionClick(entry.id, entry.name, 'Upwork')}
                    />
                  </td>
                  <td className="border-r border-gray-100">
                    <ActionCell 
                      value={entry.fiverrSupport} 
                      onView={() => handleViewSessions(entry.id, entry.name, 'Fiverr')}
                      onAdd={() => handleAddSessionClick(entry.id, entry.name, 'Fiverr')}
                    />
                  </td>
                  <td className="border-r border-gray-100">
                    <ActionCell 
                      value={entry.cvImprovement} 
                      onView={() => handleViewSessions(entry.id, entry.name, 'CV Improvement')}
                      onAdd={() => handleAddSessionClick(entry.id, entry.name, 'CV Improvement')}
                    />
                  </td>
                  <td className="border-r border-gray-100">
                    <ActionCell 
                      value={entry.resumeWriting} 
                      onView={() => handleViewSessions(entry.id, entry.name, 'Resume Writing')}
                      onAdd={() => handleAddSessionClick(entry.id, entry.name, 'Resume Writing')}
                    />
                  </td>
                  <td className="border-r border-gray-100">
                    <ActionCell 
                      value={entry.mockInterview} 
                      onView={() => handleViewSessions(entry.id, entry.name, 'Mock Interview')}
                      onAdd={() => handleAddSessionClick(entry.id, entry.name, 'Mock Interview')}
                    />
                  </td>
                  
                  <td>
                    <EditableCell value={entry.schedulingCallTat} type="text" onSave={(val) => onUpdateEntry(entry.id, 'schedulingCallTat', val)} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {/* Footer Info */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
        <span>Showing {filteredEntries.length} of {entries.length} entries</span>
        <div className="flex gap-2">
          <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div> Yes (Click for Actions)</span>
          <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div> No</span>
        </div>
      </div>

      {/* Side Drawer */}
      <SessionDrawer 
        isOpen={drawerConfig.isOpen}
        onClose={() => setDrawerConfig({ ...drawerConfig, isOpen: false })}
        sessions={filteredSessions}
        studentName={drawerConfig.studentName}
        platformType={drawerConfig.platformType}
      />

      {/* Add Session Modal */}
      <AddSessionModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        studentName={modalConfig.studentName}
        platformType={modalConfig.platformType}
        onSave={(session) => {
          onAddSession({ ...session, studentId: modalConfig.studentId });
        }}
      />
    </div>
  );
};
