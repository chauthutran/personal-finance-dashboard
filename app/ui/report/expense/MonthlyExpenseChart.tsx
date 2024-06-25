/** A chart component to display the distribution of expenses by category */

/** Generates reports on expenses over a selected time period. 
 * A detailed report showing expenses categorized by type (e.g., groceries, rent, entertainment
 * 
*/

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import LoadingIcon from "../../basics/LoadingIcon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import MonthExpenseTable from "./MonthExpenseTable";


export default function MonthlyExpenseChart({ userId, startDate, endDate, requestToUpdate = 0 }: { userId: string, startDate: string, endDate: string, requestToUpdate: number }) {

	const [data, setData] = useState<any>(null);
	const [details, setDetails] = useState<JSONObject | null>(null);

	const fetchExpenses = async () => {
		const response = await fetch(`api/report/monthly-expense-report?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);

		if (response.ok) {
			var jsonResponse: any = await response.json();
			if (jsonResponse.message == undefined) { // run successfully.
				const aggregateData = jsonResponse as JSONObject[];
				// setData(convertAggregateData(aggregateData));
				setData(aggregateData);
			}
		}
	}

	useEffect(() => {
		fetchExpenses();
	}, []);

	useEffect(() => {
		fetchExpenses();
	}, [requestToUpdate])

	
	const convertAggregateData = (aggregateData: JSONObject[]): JSONObject[] => {
		let chartData: JSONObject[] = [];
		for( let i=0; i<aggregateData.length; i++ ) {
			const aggregate = aggregateData[i];
			chartData.push({
				name: aggregate.month + " " + aggregate.year,
				uv: aggregate.totalAmount,
				amt: 2400,
			  });
		}

		return chartData;
	}

	const handleBarClick = (data: any, index: number) => {
		setDetails(data);
		// alert(JSON.stringify(data));
	};

	return (
		<>
			<h2 className="text-xl font-bold mb-4">Monthly Exppense</h2>

			{data === null && <LoadingIcon />}

			{(data !== null && data.length == 0) && <>[No data]</>}

			{(data !== null && data.length > 0) && <>
			
				{details === null && <BarChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
					>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip shared={false} trigger="click" />
					{/* <Legend /> */}
					<Bar dataKey="totalAmount" fill="#82ca9d" onClick={(data, index) => handleBarClick(data, index)}/>
				</BarChart> }

				{details !== null && <MonthExpenseTable data={details!.expenses} /> }

			</> }
		</>
	)
}
