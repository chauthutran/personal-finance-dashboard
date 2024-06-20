'use client';

import { IoMenuOutline } from "react-icons/io5";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";


export default function SectionTop() {

	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleOnLogout = () => {
		const ok = confirm("Are you sure you want to log-out ?");
		if( ok ) {
			
            
		}
	}
	const onClose = () => {
		setIsVisible(false);
	};

	return (
        <div className="w-1/3 min-w-[150px] h-screen bg-white p-1 absolute left-0 top-0">
            <div className="flex justify-end">
                <div className="inline-block ml-2 hover:bg-blue-200 p-1 cursor-pointer font-bold " onClick={(e) => onClose()}>X</div>
            </div>
            <div className="grid gap-2 p-1">
                <div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200">Client list</div>
                <div className="cursor-pointer rounded-md bg-blue-100 p-2 text-sm font-semibold text-gray-600 shadow-md hover:bg-blue-200" onClick={() => handleOnLogout()}>Logout</div>
            </div>
        </div>
	);
};
