import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomMonthPicker = ({ label, id, selectedMonth, onMonthChange }) => {
	return (
		<div>
			<label className="block text-gray-700 mb-2 text-sm" htmlFor={id}>{label}</label>

			<DatePicker
				id={id}
				selected={selectedMonth}
				onChange={date => onMonthChange(date)}
				showMonthYearPicker
				dateFormat="MM/yyyy"
				className="w-full p-2 border border-gray-300 rounded"
			/>
		</div>
	);
};

export default CustomMonthPicker;
