/** A chart component to display the distribution of expenses by category */

/** Generates reports on expenses over a selected time period. 
 * A detailed report showing expenses categorized by type (e.g., groceries, rent, entertainment
 * 
*/

import { JSONObject } from "@/lib/definations";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingIcon from "../../basics/LoadingIcon";


export default function CategoryWiseExppenseChart({ userId, startDate, endDate, requestToUpdate = 0}: { userId: string, startDate: string, endDate: string, requestToUpdate: number }) {

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

	const [data, setData] = useState<any>(null);

	const fetchExpenses = async () => {
		const response = await fetch(`api/report/category-wise-expense?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);

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

	return (
		<>
			<h2 className="text-xl font-bold mb-4">Category Wise Exppense</h2>

			{data === null && <LoadingIcon /> }

			{(data !== null && data.length == 0 ) && <>[No data]</>}

			{(data !== null && data.length > 0 ) && <PieChart width={400} height={450}>
					<Pie
						dataKey="totalAmount"
						isAnimationActive={false}
						data={data}
						cx={"50%"}
						cy={"50%"}
						outerRadius={80}
						fill="#8884d8"
						label
						style={{ outline: 'none' }}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  > </Cell>
						))}
					</Pie>

					<Tooltip />

					<Legend
						// layout="radial"
						// align="left"
						// verticalAlign="bottom"
						wrapperStyle={{ paddingLeft: '5px', paddingRight: '5px' }}
					/>
				</PieChart>
			}
		</>
	)
}
