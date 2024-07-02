import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import CategoryWiseExpenseBarChart from './CategoryWiseExpenseBarChart';
import CategoryExpensePieChart from './CategoryWiseExpensePieChart';
import { JSONObject } from '@/lib/definations';
import * as Utils from "@/lib/utils";

export default function CategoryWiseExpenseReportPage ({ data }) {

	const reportDataList = data.data;
	/**
   # The transformed data should be in the format suitable for a bar chart:
	// [
	//     { category: "Miscellaneous", 2023: 180, 2024: 180 },
	//     { category: "Entertainment", 2023: 940, 2024: 940 },
	//     { category: "Education", 2023: 500, 2024: 500 },
	//     ...
	// ];
   */
	const transformData = (): JSONObject[] => {

		let result: JSONObject[] = [];
		// return categories.map((entry) => ({
		//   category: entry.category,
		//   totalAmount: entry.totalAmount,
		// }));

		for (let i = 0; i < reportDataList.length; i++) {
			const yearData = reportDataList[i];

			const year = yearData.year;
			const categories = yearData.categories;

			for (let j = 0; j < categories.length; j++) {
				const categoryData = categories[j];
				const categoryName = categoryData.category;
				const totalAmount = categoryData.totalAmount;

				let found = Utils.findItemFromList(result, categoryName, "category");
				if (found === null) {
					var item: JSONObject = {};
					item.category = categoryName;
					item[year] = totalAmount;
					result.push(item);
				}
				else {
					found[year] = totalAmount;
				}
			}
		}

		return result;
	};

	const transformedReportData = transformData();
	const years = reportDataList.map((item) => item.year);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Cateogry Wise expense Report</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				{reportDataList.map((reportData, index) => {
					return (
						<React.Fragment key={index}>
							<div className="bg-white shadow-md rounded-lg p-4">
								<h2 className="text-xl">Expense {reportData.year}: <span className="font-bold">{reportData.totalExpense}$</span></h2>
							</div>
						</React.Fragment>)
				})}
			</div>

			<div className="bg-white shadow-md rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Expense by Categories</h2>
				<CategoryWiseExpenseBarChart data={transformedReportData} years={years} />
			</div>
			<div className="bg-white shadow-md rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
				<CategoryExpensePieChart data={reportDataList} />
				{/* <CategoryExpensePieChart /> */}
			</div>

			<div className="bg-white shadow-md rounded-lg p-4">
				<h2 className="text-xl font-semibold mb-4">Details</h2>
				<table className="min-w-full bg-white">
					<thead>
						<tr>
							<th className="py-2">Date</th>
							<th className="py-2">Amount</th>
							<th className="py-2">Description</th>
						</tr>
					</thead>
					<tbody>
						{reportDataList.map((reportData) => {
							return reportData.categories.map((category: JSONObject, index: number) => {
								return (
									<React.Fragment key={index}>
										<tr>
											<th colSpan={3} className="bg-gray-200 px-4 py-2   text-left">{category.category}:  {category.totalAmount}$</th>
										</tr>
										{category.transactions.map((transaction: JSONObject, tIndex: number) => {
											return (
												<tr key={tIndex}>
													<td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
													<td className="border px-4 py-2">{transaction.amount}</td>
													<td className="border px-4 py-2">{transaction.description}</td>
												</tr>
											);
										})}
									</React.Fragment>
								);
							})
						}
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
