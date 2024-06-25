/** A chart component to display the distribution of expenses by category */

/** Generates reports on expenses over a selected time period. 
 * A detailed report showing expenses categorized by type (e.g., groceries, rent, entertainment
 * 
*/

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import LoadingIcon from "../../basics/LoadingIcon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function MonthlyExpenseChart({ userId, startDate, endDate, requestToUpdate = 0 }: { userId: string, startDate: string, endDate: string, requestToUpdate: number }) {

	const [data, setData] = useState<any>(null);

	const fetchExpenses = async () => {
		const response = await fetch(`api/report/monthly-expense-report?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);

		if (response.ok) {
			var jsonResponse: any = await response.json();
			if (jsonResponse.message == undefined) { // run successfully.
				const aggregateData = jsonResponse as JSONObject[];
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
console.log(data);
	return (
		<>
			<h2 className="text-xl font-bold mb-4">Monthly Exppense</h2>

			{data === null && <LoadingIcon />}

			{(data !== null && data.length == 0) && <>[No data]</>}

			{(data !== null && data.length > 0) && <LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="value" stroke="#8884d8" />
				</LineChart>
			}
		</>
	)
}
