import React, { useState, useEffect, useRef } from 'react';

interface EditableCellProps {
  value: string | boolean;
  type: 'text' | 'boolean' | 'date' | 'link';
  onSave: (newValue: string | boolean) => void;
  className?: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({ value, type, onSave, className = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (type === 'boolean') {
    const boolValue = value as boolean;
    return (
      <div className={`flex items-center justify-center p-2 ${className}`}>
        <select
          value={boolValue ? 'Yes' : 'No'}
          onChange={(e) => onSave(e.target.value === 'Yes')}
          className={`px-2 py-1 rounded text-xs font-medium cursor-pointer border-none focus:ring-2 focus:ring-blue-500 ${
            boolValue 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="p-1">
        <input
          ref={inputRef}
          type={type === 'date' ? 'date' : 'text'}
          value={tempValue as string}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`p-3 text-sm cursor-pointer hover:bg-gray-50 transition-colors min-h-[40px] flex items-center ${className}`}
    >
      {type === 'link' ? (
        <a 
          href={value as string} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline truncate max-w-[150px]"
          onClick={(e) => e.stopPropagation()}
        >
          {value as string}
        </a>
      ) : (
        <span className="truncate">{value as string}</span>
      )}
    </div>
  );
};
