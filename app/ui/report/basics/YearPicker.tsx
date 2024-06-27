import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomYearPicker = ({ label, id, selectedYear, onYearChange }) => {
  return (
    <div>
			<label className="block text-gray-700 mb-2 text-sm" htmlFor={id}>{label}</label>
      <DatePicker
        id={id}
        selected={selectedYear}
        onChange={date => onYearChange(date)}
        showYearPicker
        dateFormat="yyyy"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default CustomYearPicker;
