import React, { useState } from 'react';
import CustomDatePicker from './basics/DatePicker';
import CustomMonthPicker from './basics/MonthPicker';
import CustomYearPicker from './basics/YearPicker';
import CategoryFilter from './basics/CategoryFilter';
import ReportTypeSelector from './basics/ReportTypeSelector';
import ReportDisplay from './basics/ReportDisplay';
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

	
	const [startMonth, setStartMonth ] = useState<Date | null>(new Date());
	const [endMonth, setEndMonth] = useState<Date | null>(new Date());

	//   const [selectedDate, setSelectedDate] = useState(null);
	//   const [selectedMonth, setSelectedMonth] = useState(null);
	//   const [selectedYear, setSelectedYear] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedReportType, setSelectedReportType] = useState('');
	const [chartData, setChartData] = useState<JSONObject | JSONObject[]>({});


	const [requestToUpdate, setRequestToUpdate] = useState<number>(0);

	const handleUpdateChart = () => {
		let count = requestToUpdate + 1;
		setRequestToUpdate(count);
	}

	const generateReport = async () => {
		if( selectedReportType === Constant.REPORT_TYPE_INCOME_VS_EXPENSE ) {
			await generateIncomeVsReport();
		}
		else if( selectedReportType === Constant.REPORT_TYPE_BUDGET_VS_ACTUAL ) {
			await generateBudgetVsActutalReport();
		}
		else if( selectedReportType === Constant.REPORT_TYPE_MONTHLY_EXPENSE ) {
			await generateMonthlyExpenseReport();
		}
		else if( selectedReportType === Constant.REPORT_TYPE_ANNUAL_FINANCIAL_SUMMARY ) {
			await generateAnnualFinancialSummaryReport();
		}
		else if( selectedReportType === Constant.REPORT_TYPE_CATEGORY_WISE_EXPENSE ) {
			await generateCategoryWiseExpenseReport();
		}

	}

	const generateIncomeVsReport = async() => {
		const urlPath = "monthly-report";
		const payload = {
			userId: user!._id,
			startDate: startDate!.toISOString(), 
			endDate: endDate!.toISOString(),
			dataFrom: "income;expense"
		}

		const tempChartData = await ReportService.retrieveAggregateData(urlPath, payload);

		if (tempChartData.errMsg === undefined) {
			const dataTranformed = ReportService.transformReportData_IncomeVSExpense(tempChartData, startDate!, endDate!);
			setChartData(dataTranformed);
			handleUpdateChart();
		}
		else {
			// Show error message here
		}
	}

	const generateBudgetVsActutalReport = async() => {
		const urlPath = "budget-vs-expense";
		const payload = {
			userId: user!._id,
			startDate: startDate!.toISOString(), 
			endDate: endDate!.toISOString()
		}
		
		const tempChartData = await ReportService.retrieveAggregateData(urlPath, payload);

		if (tempChartData.errMsg === undefined) {
			const dataTranformed = ReportService.transformReportData_BudgetVSActual( tempChartData );
			setChartData(dataTranformed);
			handleUpdateChart();
		}
		else {
			// Show error message here
		}
	}

	const generateMonthlyExpenseReport = async() => {
		const urlPath = "category-monthly-report";
		const payload = {
			userId: user!._id,
			startDate: startDate!.toISOString(), 
			endDate: endDate!.toISOString(),
			dataFrom: "expense"
		}
		const tempChartData = await ReportService.retrieveAggregateData(urlPath, payload);

		if (tempChartData.errMsg === undefined) {
			const dataTranformed = ReportService.transformReportData_CategoryMonthly(tempChartData, startDate!, endDate!);
			setChartData(dataTranformed);
			handleUpdateChart();
		}
		else {
			// Show error message here
		}
	}

	const generateAnnualFinancialSummaryReport = async() => {
		const urlPath = "annual-financial-summary";
		const payload = {
			userId: user!._id,
			startDate: startDate!.toISOString(), 
			endDate: endDate!.toISOString()
		}
		const tempChartData = await ReportService.retrieveAggregateData(urlPath, payload);

		if (tempChartData.errMsg === undefined) {
			const dataTranformed = ReportService.transformReportData_AnnualFinancialSummary(tempChartData);
			setChartData(dataTranformed);
			handleUpdateChart();
		}
		else {
			// Show error message here
		}
	}

	const generateCategoryWiseExpenseReport = async() => {
		const urlPath = "category-wise-expense-report";
		const payload = {
			userId: user!._id,
			startDate: startDate!.toISOString(), 
			endDate: endDate!.toISOString()
		}
		const tempChartData = await ReportService.retrieveAggregateData(urlPath, payload);
// console.log("============= tempChartData");
// console.log(tempChartData);
		if (tempChartData.errMsg === undefined) {
			// const dataTranformed = ReportService.transformReportData_AnnualFinancialSummary(tempChartData);
			setChartData(tempChartData);
			handleUpdateChart();
		}
		else {
			// Show error message here
		}
	}

	return (

		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Reports</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<ReportTypeSelector
					label="Report Type"
					id="reportType"
					selectedReportType={selectedReportType}
					onReportTypeChange={(value) => {setChartData({}); setSelectedReportType(value)}} />

				<CustomDatePicker
					label="Start Date"
					id="startDate"
					selectedDate={startDate}
					onDateChange={(date: Date | null) => {setChartData({}); setStartDate(date)}}
				// dateFormat="yyyy-MM-dd"
				// className="w-full p-2 border border-gray-300 rounded"
				/>

				<CustomDatePicker
					label="End Date"
					id="endDate"
					selectedDate={endDate}
					onDateChange={(date: Date | null) => {setChartData({}); setEndDate(date)}}
				// dateFormat="yyyy-MM-dd"
				// className="w-full p-2 border border-gray-300 rounded"
				/>

				<CategoryFilter
					label="Category Filter"
					id="ategoryFilter"
					selectedCategory={selectedCategory}
					onCategoryChange={(value) => {setChartData({}); setSelectedCategory(value)}} />

				<button className="px-4 py-2  bg-green-700 rounded text-white" onClick={() => generateReport()} >Generate chart</button>

			</div>




			{!Utils.isEmptyJSON(chartData) && <ReportDisplay reportType={selectedReportType} data={chartData} />}


		</div>
	);
};

