"use client";

import useAppHook from "@/features/hooks";
import * as Constant from "@/lib/constants";
import BudgetList from "./BudgetList";
import BudgetForm from "./BudgetForm";
import * as AppStore from "@/lib/appStore";

export default function BudgetPage() {

    const { currentUser, subPage, setSubPage } = useAppHook();
    
    return (
        <>
            { subPage == null && <BudgetList user={currentUser} />}
            { subPage == Constant.SUB_UI_ADD_FORM && <BudgetForm userId={currentUser._id}  />}
            { subPage == Constant.SUB_UI_EDIT_FORM && <BudgetForm userId={currentUser._id} data={AppStore.getSelected()} />}
        </>
    )
}