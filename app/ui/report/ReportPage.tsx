import React, { useState } from 'react';
import CustomDatePicker from './DatePicker';
import CustomMonthPicker from './MonthPicker';
import CustomYearPicker from './YearPicker';
import CategoryFilter from './CategoryFilter';
import ReportTypeSelector from './ReportTypeSelector';
import ReportDisplay from './ReportDisplay';
import { JSONObject } from '@/lib/definations';
import * as Constant from "@/lib/constants";
import * as ReportService from "@/lib/services/reportService";
import { useAuth } from '@/contexts/AuthContext';
import * as Utils from "@/lib/utils";
import { useCategory } from '@/contexts/CategoryContext';


export default function ReportPage() {

	const { user } = useAuth();
	const { categoryList } = useCategory();

	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());

	//   const [selectedDate, setSelectedDate] = useState(null);
	//   const [selectedMonth, setSelectedMonth] = useState(null);
	//   const [selectedYear, setSelectedYear] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedReportType, setSelectedReportType] = useState('');
	const [chartData, setChartData] = useState<JSONObject>({});


	const [requestToUpdate, setRequestToUpdate] = useState<number>(0);

	const handleUpdateChart = () => {
		let count = requestToUpdate + 1;
		setRequestToUpdate(count);
	}

	const generateReport = async () => {
		let urlPath = "";
		switch (selectedReportType) {
			case Constant.REPORT_TYPE_INCOME_VS_REPORT:
				urlPath = "monthly-report";
				break;
			case Constant.REPORT_TYPE_CATEGORY_WISE:
				urlPath = "category-wise-report";
				break;
			default:
				break;
		}

		const tempChartData = await ReportService.retrieveAggregateData(urlPath, user!._id, startDate!.toISOString(), endDate!.toISOString(), "income;expense");

		if (tempChartData.errMsg === undefined) {
			const dataTranformed = transformData( selectedReportType, tempChartData );
			setChartData(dataTranformed);
			handleUpdateChart();
		}
		else {
			// Show error message here
		}
	}

	const transformData = (reportType: string, data: JSONObject ): JSONObject[] => {
		var result: JSONObject[] = [];
		if( reportType === Constant.REPORT_TYPE_INCOME_VS_REPORT ) {
			const incomeData = data.incomeData;
			const expenseData = data.expenseData;
			// totalAmount: number;
			// details: JSONObject[],
			// month: number,
			// year: number

			// {
			// 	name: "Page G",
			// 	uv: 3490,
			// 	pv: 4300,
			// 	amt: 2100,
			//   },

			const incomePeriods = incomeData.map((item: JSONObject) => `${item.month}-${item.year}`);
			const exprensePeriods = expenseData.map((item: JSONObject) => `${item.month}-${item.year}`);
			let periods: string[] = Array.from(new Set([...incomePeriods, ...exprensePeriods]));
			periods.sort();

console.log("=== periods");
console.log(periods);

			for( var i=0; i< periods.length; i++ ) {
				const period = periods[i];
				const income = incomeData.filter((item) => `${item.month}-${item.year}` === period);
				const expense = expenseData.filter((item) => `${item.month}-${item.year}` === period);

				const incomeVal = (income === undefined || income.length == 0) ? 0 : income[0].totalAmount;
				const expenseVal = (expense === undefined || expense.length == 0 ) ? 0 : expense[0].totalAmount;
				result.push({
					name: period,
					income: incomeVal,
					expense: expenseVal
				})
			}

		}
		
		return result;
	}

	return (

		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Reports</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<ReportTypeSelector
					label="Report Type"
					id="reportType"
					selectedReportType={selectedReportType}
					onReportTypeChange={setSelectedReportType} />

				<CustomDatePicker
					label="Start Date"
					id="startDate"
					selectedDate={startDate}
					onDateChange={(date: Date | null) => setStartDate(date)}
				// dateFormat="yyyy-MM-dd"
				// className="w-full p-2 border border-gray-300 rounded"
				/>

				<CustomDatePicker
					label="End Date"
					id="endDate"
					selectedDate={endDate}
					onDateChange={(date: Date | null) => setEndDate(date)}
				// dateFormat="yyyy-MM-dd"
				// className="w-full p-2 border border-gray-300 rounded"
				/>

				<CategoryFilter
					label="Category Filter"
					id="ategoryFilter"
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory} />

				<button className="px-4 py-2  bg-green-700 rounded text-white" onClick={() => generateReport()} >Generate chart</button>

			</div>


			{!Utils.isEmptyJSON(chartData) && <ReportDisplay reportType={selectedReportType} data={chartData} />}


		</div>

		// <div className="container mx-auto p-4">
		//   <h1 className="text-2xl font-bold mb-4">Reports</h1>
		//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		//     <CustomDatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
		//     <CustomMonthPicker selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
		//     <CustomYearPicker selectedYear={selectedYear} onYearChange={setSelectedYear} />
		//     <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
		//     <ReportTypeSelector selectedReportType={selectedReportType} onReportTypeChange={setSelectedReportType} />
		//   </div>
		//   <ReportDisplay data={reportData} />
		// </div>
	);
};

