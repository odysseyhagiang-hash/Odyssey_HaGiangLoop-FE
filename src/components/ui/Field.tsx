import React, { useId, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const controlClasses =
'w-full rounded-2xl border border-ink/12 bg-white/80 px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-muted/70 transition-colors duration-300 hover:border-ink/25 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20';

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (id: string, describedBy: string | undefined) => React.ReactNode;
  className?: string;
}

function FieldShell({ label, hint, error, required, children, className }: FieldShellProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">
        {label}
        {required && <span className="ml-1 text-forest-500">*</span>}
      </label>
      {children(id, describedBy)}
      {hint && !error &&
      <p id={`${id}-hint`} className="text-xs text-ink-muted">
          {hint}
        </p>
      }
      {error &&
      <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      }
    </div>);

}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function TextField({ label, hint, error, className, ...rest }: InputProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={rest.required} className={className}>
      {(id, describedBy) =>
      <input
        id={id}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={cn(controlClasses, error && 'border-red-400')}
        {...rest} />

      }
    </FieldShell>);

}

type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

export function TextAreaField({ label, hint, error, className, ...rest }: TextAreaProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} required={rest.required} className={className}>
      {(id, describedBy) =>
      <textarea
        id={id}
        rows={5}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={cn(controlClasses, 'resize-none', error && 'border-red-400')}
        {...rest} />

      }
    </FieldShell>);

}

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  label: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  className?: string;
};

export function SelectField({ label, hint, error, options, value, onChange, className, ...rest }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  const handleSelect = (val: string) => {
    if (onChange) {
      const fakeEvent = {
        target: { value: val }
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(fakeEvent);
    }
    setIsOpen(false);
  };

  return (
    <FieldShell label={label} hint={hint} error={error} required={rest.required} className={className}>
      {(id, describedBy) => (
        <div ref={containerRef} className="relative w-full">
          <button
            id={id}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-describedby={describedBy}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              controlClasses,
              'flex items-center justify-between text-left pr-4 cursor-pointer select-none',
              error && 'border-red-400',
              isOpen && 'border-forest-500 ring-2 ring-forest-500/20'
            )}
          >
            <span>{selectedOption ? selectedOption.label : 'Select an option'}</span>
            <ChevronDown className={cn('h-4 w-4 text-ink-muted transition-transform duration-300', isOpen && 'rotate-180')} />
          </button>

          {isOpen && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-auto rounded-2xl border border-ink/8 bg-white p-1.5 shadow-editorial outline-none animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'relative cursor-pointer select-none rounded-xl px-4 py-2.5 text-[15px] text-ink-soft transition-colors duration-200 hover:bg-forest-50 hover:text-forest-700',
                      isSelected && 'bg-forest-50/70 font-semibold text-forest-700'
                    )}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </FieldShell>
  );
}