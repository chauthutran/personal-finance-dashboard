"use client";
import useAppHook from "@/features/hooks";
import * as Constant from "@/lib/constants";
import LoginForm from "./auth/LoginForm";
import HomePage from "./HomePage";
import BudgetPage from "./budget/BudgetPage";
import RegisterForm from "./auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";
import { BudgetProvider } from "@/contexts/BudgetContext";

export default function AppWrapper() {
    const { mainPage } = useMainUi();
    
    return (
        <>
            { mainPage == Constant.UI_INTRO_PAGE && <HomePage /> }

            { mainPage == Constant.UI_LOGIN_PAGE && <LoginForm /> }

            { mainPage == Constant.UI_REGISTRATION_PAGE && <RegisterForm /> }

            { mainPage == Constant.UI_BUDGET_PAGE && <BudgetPage /> }
        </>
    )
}