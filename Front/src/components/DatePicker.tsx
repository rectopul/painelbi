'use client'

import { useEffect, useRef } from "react";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface DatePickerProps {
    onChange: (selectedDate: Date[]) => void;
}

export function DatePicker({ onChange }: DatePickerProps) {
    const datePickerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (datePickerRef.current) {
          const flatpickrInstance = flatpickr(datePickerRef.current, {
            mode: "range",
            dateFormat: 'M d, Y',
            onChange: (selectedDates) => {
              if (selectedDates && selectedDates[0]) {
                onChange(selectedDates);
              }
            },
          });
    
          return () => {
            flatpickrInstance.destroy();
          };
        }
      }, [onChange]);

    return (
        <div className="w-[250px] border border-slate-200 p-2 bg-white text-sm font-medium">
            <input
                type="text"
                className='w-full outline-none pl-5 h-full leading-5'
                ref={datePickerRef}
                placeholder="Selecione uma data"
            />
        </div>
    )
}