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

type ProgressBarProps = {
	percentage: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
	return (
		<div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
			<div
				className="bg-blue-500 h-full"
				style={{ width: `${percentage}%` }}
			></div>
		</div>
	);
};


export default function BudgetVsActualProcessBar({ data }: { data: JSONObject }) {

	const reportData = data.data;

	const calculatePercentage = (actual: number, budget: number): number => {
		return (actual / budget) * 100;
	};

	return (
		<div className="mb-10">
			{reportData.map((item) => (
				<div key={item.name} className="mb-4">
					<h2 className="font-semibold">{item._id.categoryName}</h2>
					<ProgressBar percentage={calculatePercentage(item.actualAmount, item.budgetAmount)} />
					<p className="text-sm mt-2">
						{calculatePercentage(item.expenseAmount, item.budgetAmount).toFixed(2)}% of the budget used
					</p>
				</div>
			))}
		</div>
	);
}
