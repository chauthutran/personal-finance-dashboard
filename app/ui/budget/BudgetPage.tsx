"use client";

import useAppHook from "@/features/hooks";
import * as Constant from "@/lib/constants";
import BudgetList from "./BudgetList";
import BudgetForm from "./BudgetForm";

export default function BudgetPage() {

    
    const { currentUser, subPage, setSubPage } = useAppHook();
console.log(currentUser);
    return (
        <>
            { subPage == Constant.UI_BUDGET_LIST && <BudgetList user={currentUser} />}
            { subPage == Constant.UI_BUDGET_ADD_FORM && <BudgetForm userId={currentUser._id}  />}
            {/* { subPage == Constant.UI_BUDGET_EDIT_FORM && <BudgetForm userId={currentUser._id} />} */}
        </>
    )
}