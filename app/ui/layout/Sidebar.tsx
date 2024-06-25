'use client';

import { useState } from "react";
import * as Constant from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";

export default function SlideBar({handleOnClose = () => {}}: {handleOnClose: () => void}) {

	const { logout } = useAuth();
	const { setMainPage } = useMainUi();

	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleOnLogout = () => {
		const ok = confirm("Are you sure you want to log-out ?");
		if( ok ) {
			logout();
            setMainPage(Constant.UI_LOGIN_PAGE);
		}

		handleOnClose();
	}
	
	const handleClickOnBudget = () => {
		setMainPage(Constant.UI_BUDGET_PAGE); 
		handleOnClose();
	}
	
	const handleClickOnExpense = () => {
		setMainPage(Constant.UI_EXPENSE_PAGE); 
		handleOnClose();
	}

	const handleClickOnIncome = () => {
		setMainPage(Constant.UI_INCOME_PAGE); 
		handleOnClose();
	}

	const handleClickOnDashboard = () => {
		setMainPage(Constant.UI_DASHBOARD_PAGE); 
		handleOnClose();
	}

	const handleClickOnReport = () => {
		setMainPage(Constant.UI_REPORT_PAGE); 
		handleOnClose();
	}

	return (
        <div className="w-1/3 min-w-[150px] h-screen bg-white p-1 absolute left-0 top-0" >
            <div className="flex justify-end">
                <div className="inline-block ml-2 hover:bg-blue-200 p-1 cursor-pointer font-bold " onClick={(e) => handleOnClose()}>X</div>
            </div>
            <div className="grid gap-2 p-1">
				<div className="cursor-pointer rounded-md bg-green-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-green-200" onClick={() => handleClickOnDashboard() }>Dashboard</div>

				<hr className="mt-5" />
				<div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200" onClick={() => handleClickOnBudget() }>Budgets</div>
                <div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200" onClick={() => handleClickOnExpense() }>Expenses</div>
                <div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200" onClick={() => handleClickOnIncome() }>Incomes</div>

				<hr className="mt-5" />
                <div className="cursor-pointer rounded-md bg-purple-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-purple-200" onClick={() => handleClickOnReport() }>Report</div>

				<hr className="mt-5" />
                <div className="cursor-pointer rounded-md bg-red-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-red-200" onClick={() => handleOnLogout()} >Logout</div>
            </div>
        </div>
	);
};
