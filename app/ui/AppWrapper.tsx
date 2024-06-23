"use client";

import * as Constant from "@/lib/constants";
import LoginForm from "./auth/LoginForm";
import HomePage from "./HomePage";
import BudgetPage from "./budget/BudgetPage";
import RegisterForm from "./auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";
import { CategoryProvider } from "@/contexts/CategoryContext";

export default function AppWrapper() {
    const { mainPage } = useMainUi();
    const { user } = useAuth();
    return (
        <>
            { mainPage == Constant.UI_INTRO_PAGE && <HomePage /> }

            { mainPage == Constant.UI_LOGIN_PAGE && <LoginForm /> }

            { mainPage == Constant.UI_REGISTRATION_PAGE && <RegisterForm /> }


            {user != null && <CategoryProvider userId={user._id}>
                { mainPage == Constant.UI_BUDGET_PAGE && <BudgetPage /> }
            </CategoryProvider> }
        </>
    )
}