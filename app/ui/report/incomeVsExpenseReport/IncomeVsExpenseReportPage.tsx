import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils";
import IncomeVsExpenseBarChart from './IncomeVsExpenseBarChart';
import IncomeVsExpensePieChart from './incomeVsExpensePieChart';

// <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
//           <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />

export default function IncomeVsExpenseReportPage({ data, periodType, startDate, endDate }) {

	const reportDataList = data.data;

	// // [
	// // 	{name: "2004-1", totalIncome: 0, totalExpense": 343 },
	// // 	...
	// // ]
	// const transformData = () => {
	// 	let result: JSONObject[] = [];

	// 	for( var i=0; i<reportDataList.length; i++ ) {
	// 		const reportDate = reportDataList[i];
	// 		let names: string[] = [];
	// 		for( var key in reportDate.date) {
	// 			names.push( reportDate.date[key] );
	// 		}

	// 		result.push({
	// 			name: names.join(" - "),
	// 			totalIncome: reportDate.totalIncome,
	// 			totalExpense: reportDate.totalExpense
	// 		});

	// 	return result;
	// }

	// const transformedReportData = transformData();
	// const years = reportDataList.map((item) => item.year);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Income vsxpense Report</h1>
			{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				{reportDataList.map((reportData, index) => {
					return (
						<React.Fragment key={index}>
							<div className="bg-white shadow-md rounded-lg p-4">
								<h2 className="text-xl">Expense {reportData.year}: <span className="font-bold">{reportData.totalExpense}$</span></h2>
							</div>
						</React.Fragment>)
				})}
			</div> */}

			<div className="bg-white shadow-md rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Income vs Expense</h2>
				<IncomeVsExpenseBarChart data={reportDataList} startDate={startDate} endDate={endDate} periodType={periodType} />
			</div>
			<div className="bg-white shadow-md rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Income / Expense Distribution</h2>
				<IncomeVsExpensePieChart data={reportDataList} />
				{/* <CategoryExpensePieChart /> */}
			</div>

			<div className="bg-white shadow-md rounded-lg p-4">
				<h2 className="text-xl font-semibold mb-4">Details</h2>
				<table className="min-w-full bg-white">
					<thead>
						<tr>
							<th className="py-2">Category</th>
							<th className="py-2">Amount</th>
						</tr>
					</thead>
					<tbody>
						{reportDataList.map((reportData, rIdx) => {
							return (<React.Fragment key={rIdx}>
								
								{/* Expense  */}
								<tr>
									<th colSpan={2} className="bg-gray-200 px-4 py-2  text-left">Period: {reportData.date.month && reportData.date.month.toString().padStart(2, '0')} {reportData.date.quarter && <span>Q{reportData.date.quarter}</span>} {reportData.date.year}</th>
								</tr>
								<tr>
									<th colSpan={2} className="bg-gray-200 px-4 py-2 text-left">Total Expense:  {reportData.totalExpense}$</th>
								</tr>
								<tr>
									<th colSpan={2} className="bg-gray-200 px-4 py-2 text-left">Total Income:  {reportData.totalIncome}$</th>
								</tr>

								{(reportData.expense == undefined) ? "" : Object.keys(reportData.expense).map((categoryName: string, index: number) => {

									return (
											<tr key={index} className="text-red-600">
												<td className="border px-4 py-2">Expense - {categoryName}</td>
												<td className="border px-4 py-2">{reportData.expense[categoryName]}</td>
											</tr>
									);
								})}

								{/* Income  */}
								{(reportData.income == undefined) ? "" : Object.keys(reportData.income).map((categoryName: string, index: number) => {

									return (
											<tr key={index} className="text-green-600">
												<td className="border px-4 py-2 ">Income -{categoryName}</td>
												<td className="border px-4 py-2">{reportData.income[categoryName]}</td>
											</tr>
									);
								})}
							</React.Fragment>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
