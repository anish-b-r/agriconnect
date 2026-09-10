import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  dropdownWidth?: string;
  size?: 'sm' | 'md';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  icon: IconProp,
  className = '',
  dropdownWidth = 'w-56',
  size = 'md',
  align = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-1.5 sm:gap-2.5 bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-900 font-extrabold rounded-full shadow-2xs cursor-pointer transition-all outline-none ${
          size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs'
        } ${isOpen ? 'border-[#1b4332] ring-1 ring-[#1b4332]' : ''}`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 truncate">
          {IconProp && <IconProp className="w-3.5 h-3.5 text-[#1b4332] shrink-0" />}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1b4332]' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-1.5 ${dropdownWidth} max-w-[90vw] max-h-64 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-white border border-stone-200/90 rounded-2xl shadow-xl z-50 p-1.5 space-y-0.5 animate-scaleUp`}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            const OptionIcon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#1b4332] text-white shadow-2xs'
                    : 'text-stone-700 hover:bg-stone-100/80 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  {OptionIcon && <OptionIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-stone-400'}`} />}
                  <div>
                    <div className="truncate">{option.label}</div>
                    {option.sublabel && (
                      <div className={`text-[10px] font-mono ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                        {option.sublabel}
                      </div>
                    )}
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-emerald-300" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
