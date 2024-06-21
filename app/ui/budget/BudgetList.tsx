/** Lists all budgets with details such as amount, start date, and end date. */
"use client";

import { useEffect, useState } from "react"
import BudgetItem from "./BudgetItem"
import { JSONObject } from "@/lib/definations";

export default function BudgetList({user}: {user: JSONObject}) {

	const userId = (user) ? user._id : "";
	
	const [budgetList, setBudgetList] = useState<JSONObject[]>([]);
	const [error, setError] = useState<string>("");

	const fetchBudget = async() => {
		const response = await fetch(`api/budget?userId=${userId}`);

		if (!response.ok) {
			setError("Network response was not ok");
		}
		else {
			const list = await response.json();
			setBudgetList(list);
		}
	}

	useEffect(()=> {
		fetchBudget();
	});

    return (
		<>
			<div className="divSiceNav w-10 hidden bg-gray-700 text-gray-300 p-1">m1</div>
			<div className="divMainList m-1 grid h-[calc(100vh-90px)] flex-1 content-start gap-1 overflow-x-auto border-0 border-gray-400 md:grid-cols-2">
				{budgetList.map( (budget: JSONObject) => (
					<BudgetItem key={budget._id} data={budget}  />
				))}
			</div>
		</>
    )
}