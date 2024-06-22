/** Lists all budgets with details such as amount, start date, and end date. */
"use client";

import { useEffect, useState } from "react"
import BudgetItem from "./BudgetItem"
import { JSONObject } from "@/lib/definations";
import * as Constant from "@/lib/constants";
import { useBudget } from "@/contexts/BudgetContext";
import { useMainUi } from "@/contexts/MainUiContext";

export default function BudgetList() {
	
	const { setSubPage } = useMainUi();
	const { userId, budgetList } = useBudget();

	useEffect(()=> {
		console.log("Refresh the Budget list");
	}, [budgetList]);

    return (
		<>
			{/* <div className="m-1 grid flex-1 content-start gap-1 overflow-x-auto border-0 border-gray-400 md:grid-cols-2"> */}
			<div className="h-[calc(100vh-110px)] m-1 grid flex-1 content-start gap-1 overflow-x-auto border-0 border-gray-400 md:grid-cols-2">
				{budgetList && budgetList.map( (budget: JSONObject) => (
					<BudgetItem key={budget._id} data={budget}  />
				))}
			</div>

			{/* <!-- Floating Button --> */}
			<button className="fixed bottom-16 right-5 w-14 h-14 bg-sal bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-lg flex items-center justify-center text-2xl"
			onClick={()=> setSubPage(Constant.SUB_UI_ADD_FORM)}> + </button>
			
		</>
    )
}