import * as Constant from "@/lib/constants";

const reportTypes = [
	Constant.REPORT_TYPE_INCOME_VS_EXPENSE, // Compare income and expenses over a period ( Bar Chart and Line Chart) weekly, monthly, yearly 
	Constant.REPORT_TYPE_BUDGET_VS_ACTUAL, // Compare budgeted amounts with actual spending ( Bar Chart and Line Chart) 
	'Monthly Expense Report', // Summarizes expenses for each month ( Bar Chart and Pie Chart), Month-to-month comparison. --> ( choose a year )
	'Annual Financial Summary', // Provides a yearly overview of income, expenses, and savings ( Area Chart, Stacked Bar Chart - broken down by category ), Annual (full year).
	'Category-wise Expense Report', // Details expenses by category. ( Bar Chart and Pie Chart), Typically monthly or annually.
	//   'Comparison Report',
	//   'Trend Report',
];

const ReportTypeSelector = ({ label, id, selectedReportType, onReportTypeChange }) => {
	return (
		<div>
			<label className="block text-gray-700 mb-2 text-sm" htmlFor={id}>{label}</label>
			<select
				id={id}
				value={selectedReportType}
				onChange={e => onReportTypeChange(e.target.value)}
				className="w-full p-2 border border-gray-300 rounded"
			>
				
				<option value="">[Please select]</option>
				{reportTypes.map((type, index) => (
					<option key={index} value={type}>
						{type}
					</option>
				))}
			</select>
		</div>
	);
};

export default ReportTypeSelector;
