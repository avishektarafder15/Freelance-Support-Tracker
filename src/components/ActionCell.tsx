import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActionCellProps {
  value: boolean;
  onView: () => void;
  onAdd: () => void;
  className?: string;
}

export const ActionCell: React.FC<ActionCellProps> = ({ value, onView, onAdd, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!value) {
    return (
      <div className={`flex items-center justify-center p-2 ${className}`}>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
          No
        </span>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center p-2 ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200 transition-colors"
      >
        Yes
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            <button
              onClick={() => {
                onAdd();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <Plus size={14} className="text-blue-500" />
              Add
            </button>
            <button
              onClick={() => {
                onView();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Eye size={14} className="text-green-500" />
              View
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
