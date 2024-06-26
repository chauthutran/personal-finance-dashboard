import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import * as Constant from "@/lib/constants";
import * as Utils from "@/lib/utils";
import * as ReportService from "@/lib/services/reportService";
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import CustomPieChart from './CustomPieChart';


export default function ReportPage() {

	const { user } = useAuth();

	const [reportType, setReportType] = useState("");
	const [dataFrom, setDataFrom] = useState<string[]>([]);
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	const [year, setYear] = useState<string>("");

	const [chartData, setChartData] = useState<JSONObject>({});


	const [requestToUpdate, setRequestToUpdate] = useState<number>(0);

	const handleUpdateChart = () => {
		let count = requestToUpdate + 1;
		setRequestToUpdate(count);
	}


	const setDataFromArr = (checked: boolean, value: string) => {
		if (checked) {
			dataFrom.push(value);
			setDataFrom(dataFrom);
		}
		else {
			const filteredArray = dataFrom.filter(item => item !== value);
			setDataFrom(filteredArray);
		}
	}

	const generateReport = async () => {

		let urlPath = "";
		switch (reportType) {
			case Constant.REPORT_TYPE_CATEGORY_WISE:
				urlPath = "category-wise-report";
				break;
			case Constant.REPORT_TYPE_CATEGORY_WISE:
				urlPath = "monthly-report";
				break;
			default:
				break;
		}

		const tempChartData = await ReportService.retrieveAggregateData(urlPath, user!._id, startDate!.toISOString(), endDate!.toISOString(), dataFrom.join(";"));

		if (tempChartData.errMsg === undefined) {
			setChartData(tempChartData);
			handleUpdateChart();
		}
		else {
			// Show error message here
		}
	}


	console.log(chartData);

	return (
		<div className="container p-4">

			<div className="flex ">
				<div className="p-6 rounded border-2 bg-slate-200 shadow-md w-full max-w-md">
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="reportType">
							Report type
						</label>
						<select
							className="w-full p-2 border border-gray-300 rounded"
							value={reportType}
							onChange={(e) => setReportType(e.target.value)}>
							<option value="">[Please select]</option>
							<option value={Constant.REPORT_TYPE_CATEGORY_WISE}>Category Wise report</option>
							<option value={Constant.REPORT_TYPE_MONTHLY_REPORT}>Montly report</option>
						</select>
					</div>

					{reportType === Constant.REPORT_TYPE_CATEGORY_WISE && <div className="flex px-1  items-center">
						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="startDate">
								From
							</label>
							<DatePicker
								selected={startDate}
								onChange={(date: Date | null) => setStartDate(date)}
								dateFormat="yyyy-MM-dd"
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="mb-4 mx-4">
							<label className="block text-gray-700 mb-2" htmlFor="endDate">
								To
							</label>
							<DatePicker
								selected={endDate}
								onChange={(date: Date | null) => setEndDate(date)}
								dateFormat="yyyy-MM-dd"
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
					</div>}

					{reportType === Constant.REPORT_TYPE_MONTHLY_REPORT && <div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="year">
							Year
						</label>
						<input
							type="number"
							id="year"
							value={year}
							onChange={(e) => setYear(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>}

				
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">
							Data from
						</label>
						<label className="cursor-pointer mr-5">
							<input className="mr-3" type="checkbox" onClick={(e: React.MouseEvent<HTMLInputElement>) => setDataFromArr(e.currentTarget.checked, "expense")} />
							Expense
						</label>
						<label className="cursor-pointer mr-5">
							<input className="mr-3" type="checkbox" onClick={(e: React.MouseEvent<HTMLInputElement>) => setDataFromArr(e.currentTarget.checked, "income")} />Income
						</label>
						<label className="cursor-pointer">
							<input className="mr-3" type="checkbox" onClick={(e: React.MouseEvent<HTMLInputElement>) => setDataFromArr(e.currentTarget.checked, "budget")} />Budget
						</label>
					</div>
					
					<button className="px-4 py-2  bg-green-700 rounded text-white" onClick={() => generateReport()} >Generate chart</button>
				</div>

			</div>


			{!Utils.isEmptyJSON(chartData) && <div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="">

					<CustomPieChart requestToUpdate={requestToUpdate} expenseData={chartData.expenseData} incomeData={chartData.incomeData} budgetData={chartData.budgetData} />
				</div>
			</div>}

		</div>
	);
};

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