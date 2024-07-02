import { JSONObject } from "@/lib/definations";
import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import * as ReportService from "@/lib/services/reportService";
import * as Constant from "@/lib/constants";
import * as Utils from "@/lib/utils";


// data = [
// {
// 	"totalIncome": 0,
// 	"totalExpense": 343,
// 	"date": {
// 		"year": 2023,
// 		"month": 5,  //"quarter": 3 // undefined
// 	},
// 	"expense": {
// 		"Insurance": 250,
// 		"Transportation": 23,
// 		"Entertainment": 70
// 	}
// }
// ...
// ]
export default function IncomeVsExpenseBarChart({ data, periodType, startDate, endDate }) {

	// [
	// 	{name: "2004-1", totalIncome: 0, totalExpense": 343 },
	// 	...
	// ]
	const transformData = (): JSONObject[] => {

		if( periodType == Constant.REPORT_PERIOD_TYPE_MONTHLY ) {
			return transformData_Monthly(startDate, endDate);
		}
		else if( periodType == Constant.REPORT_PERIOD_TYPE_QUARTERLY ) {
			return transformData_Quarterly(startDate, endDate);
		}
		else if( periodType == Constant.REPORT_PERIOD_TYPE_YEARLY ) {
			return transformData_Yearly(startDate, endDate);
		}

		return [];
		// return Utils.generateYearList(startDate, endDate);

		// let result: JSONObject[] = [];

		// for( var i=0; i<data.length; i++ ) {
		// 	const reportDate = data[i];
		// 	let dataKey = reportDate.date.year;
		// 	if( reportDate.date.month !== undefined ) {
		// 		dataKey += `-${reportDate.date.month}`;
		// 	}
		// 	else if( reportDate.date.quarter !== undefined ) {
		// 		dataKey += `-${reportDate.date.quarter}`;
		// 	}

		// 	result.push({
		// 		name: dataKey,
		// 		totalIncome: reportDate.totalIncome,
		// 		totalExpense: reportDate.totalExpense
		// 	});

		// }
		// return result;
	}

	const transformData_Monthly = (startDate, endDate): JSONObject[] => {
		let result: JSONObject[] = [];

		const monthList = Utils.generateMonthList(startDate, endDate);
		for (var i = 0; i < monthList.length; i++) {
			const monthInfo = monthList[i];

			const found = data.filter((item) => (item.date.month === monthInfo.month && item.date.year === monthInfo.year));
			
			let totalIncome = 0;
			let totalExpense = 0;
			if( found.length > 0 ) {
				totalIncome = found[0].totalIncome;
				totalExpense = found[0].totalExpense;
			}

			result.push({
				name: monthInfo.displayName,
				Income: totalIncome,
				Expense: totalExpense,
			});

		}
		return result;
	}

	
	const transformData_Quarterly = (startDate, endDate): JSONObject[] => {
		let result: JSONObject[] = [];

		const quarterList = Utils.generateQuarterList(startDate, endDate);
		for (var i = 0; i < quarterList.length; i++) {
			const quarterInfo = quarterList[i];
			const found = data.filter((item) => (item.date.year === quarterInfo.year && item.date.quarter === quarterInfo.quarter ));
			
			let totalIncome = 0;
			let totalExpense = 0;
			if( found.length > 0 ) {
				totalIncome = found[0].totalIncome;
				totalExpense = found[0].totalExpense;
			}

			result.push({
				name: quarterInfo.displayName,
				Income: totalIncome,
				Expense: totalExpense,
			});

		}
		return result;
	}

	const transformData_Yearly = (startDate, endDate): JSONObject[] => {
		let result: JSONObject[] = [];

		const yearList = Utils.generateYearList(startDate, endDate);
		for (var i = 0; i < yearList.length; i++) {
			const yearInfo = yearList[i];
			const found = data.filter((item) => (item.date.year === yearInfo.dataKey));
			
			let totalIncome = 0;
			let totalExpense = 0;
			if( found.length > 0 ) {
				totalIncome = found[0].totalIncome;
				totalExpense = found[0].totalExpense;
			}

			result.push({
				name: yearInfo.displayName,
				Income: totalIncome,
				Expense: totalExpense,
			});

		}
		return result;
	}

	const transformedReportData = transformData();
	
	return (
		<ResponsiveContainer width="100%" height={400}>
		<BarChart
			data={transformedReportData}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis 
				dataKey="name" 
				interval={0}
				angle={-45}
				textAnchor="end"
				tick={{ fontSize: 12 }}
			/>
			<YAxis />
			{/* <Tooltip shared={false} trigger="click" /> */}
			<Tooltip />
			<Legend wrapperStyle={{paddingTop: "60px"}} />
			<Bar dataKey={"Income"} fill={ReportService.incomeColors[0]} />
			<Bar dataKey={"Expense"} fill={ReportService.expenseColors[0]} />
		</BarChart>
		</ResponsiveContainer>
		// </div>
	);
}
