/** A page for managing budgets, including viewing current budgets and creating new ones. Contains the BudgetList and BudgetForm components. */

"use client";

import useAppHook from "@/features/hooks";
import BudgetList from "@/ui/budget/BudgetList";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Utils from "@/lib/utils";

export default function BudgetPage() {
    // const router = useRouter();
    const { currentUser } = useAppHook();

	// useEffect(() => {
	//   if( !Utils.isEmptyJSON( currentUser ) ) {
	//     router.push("/budget");
	//   }
	// },[currentUser])


    return (
        <BudgetList user={currentUser}/>
    )
}