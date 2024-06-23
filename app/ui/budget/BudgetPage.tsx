"use client";

import * as Constant from "@/lib/constants";
import BudgetList from "./BudgetList";
import BudgetForm from "./BudgetForm";
import * as AppStore from "@/lib/appStore";
import { BudgetProvider } from "@/contexts/BudgetContext";
import { useMainUi } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";

export default function BudgetPage() {

    const { subPage } = useMainUi();
    const { user } = useAuth();

    return (
        
        <BudgetProvider userId={user!._id}>
        <>
            { subPage === null && <BudgetList /> }
            { subPage == Constant.SUB_UI_ADD_FORM && <BudgetForm  />}
            { subPage == Constant.SUB_UI_EDIT_FORM && <BudgetForm data={AppStore.getSelected()!} />}
        </>
        </BudgetProvider>
    )
}