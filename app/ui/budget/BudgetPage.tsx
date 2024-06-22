"use client";

import useAppHook from "@/features/hooks";
import * as Constant from "@/lib/constants";
import BudgetList from "./BudgetList";
import BudgetForm from "./BudgetForm";
import * as AppStore from "@/lib/appStore";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { useMainUi } from "@/contexts/MainUiContext";

export default function BudgetPage() {

    const { subPage } = useMainUi();
    
    return (
        <>
            { subPage === null && <BudgetList /> }
            {/* { subPage == Constant.SUB_UI_ADD_FORM && <BudgetForm  />}
            { subPage == Constant.SUB_UI_EDIT_FORM && <BudgetForm data={AppStore.getSelected()} />} */}
        </>
    )
}