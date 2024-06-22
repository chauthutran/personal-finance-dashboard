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
	

	return (
        <div className="w-1/3 min-w-[150px] h-screen bg-white p-1 absolute left-0 top-0" >
            <div className="flex justify-end">
                <div className="inline-block ml-2 hover:bg-blue-200 p-1 cursor-pointer font-bold " onClick={(e) => handleOnClose()}>X</div>
            </div>
            <div className="grid gap-2 p-1">
                <div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200" onClick={() => { setMainPage(Constant.UI_BUDGET_PAGE); handleOnClose(); }}>Budgets</div>
                <div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200" onClick={() => handleOnLogout()} >Logout</div>
            </div>
        </div>
	);
};
