/** Lists all budgets with details such as amount, start date, and end date. */
"use client";

import { useEffect, useState } from "react"
import BudgetItem from "./BudgetItem"
import { JSONObject } from "@/lib/definations";
import useAppHook from "@/features/hooks";
import * as Constant from "@/lib/constants";

export default function BudgetList({user}: {user: JSONObject}) {
	console.log("====== BudgetList");
console.log(user);
	const userId = (user) ? user._id : "";

	const { budgetList, fetchBudgetList, setSubPage } = useAppHook();

	useEffect(()=> {
		if( budgetList == null ) {
			fetchBudgetList(userId);
		}
	}, []);

    return (
		<>
			<div className="divMainList m-1 grid h-[calc(100vh-90px)] flex-1 content-start gap-1 overflow-x-auto border-0 border-gray-400 md:grid-cols-2">
				{budgetList && budgetList.map( (budget: JSONObject) => (
					<BudgetItem key={budget._id} data={budget}  />
				))}
			</div>

			{/* <!-- Floating Button --> */}
			<button className="fixed bottom-16 right-5 w-14 h-14 bg-sal bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-lg flex items-center justify-center text-2xl"
			onClick={()=> setSubPage(Constant.UI_BUDGET_ADD_FORM)}> + </button>
			
		</>
    )
}