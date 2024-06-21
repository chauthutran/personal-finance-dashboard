import useAppHook from "@/features/hooks";
import { IoMdArrowRoundBack } from "react-icons/io";
import * as Constant from "@/lib/constants";
import { IoMenuOutline } from "react-icons/io5";
import Modal from "./modal";
import { useState } from "react";
import SlideBar from "./Sidebar";


export default function Header() {

	const { mainPage, subPage, setSubPage } = useAppHook();
	
	const [isVisible, setIsVisible] = useState<boolean>(false);

	// const handleOnLogout = () => {
	// 	const ok = confirm("Are you sure you want to log-out ?");
	// 	if( ok ) {
	// 		AppStore.setUser(null);
	// 		setMainUi(Constant.UI_LOGIN_PAGE);
	// 	}
	// }
	// const onClose = () => {
	// 	setIsVisible(false);
	// };
console.log(subPage);
    return (
        // <div className="w-full py-6 bg-blue-600 text-white text-center bg-blue-700 p-1 grid grid-cols-2">
		// 		<div className="flex justify-start items-center text-center">
		// 			{/* <IoMdArrowRoundBack  className="text-2xl font-bold cursor-pointer hover:bg-blue-500" /> */}
		// 			<h1 className="text-4xl font-bold">Personal Finance Management</h1>
		// 		</div>
		// 		<div>
		// 		</div>
		// 	</div>

        <>
			{( mainPage == Constant.UI_INTRO_PAGE || mainPage == Constant.UI_LOGIN_PAGE ) 
				? <header className="w-full py-6 bg-blue-600 text-white text-center">
					<h1 className="text-4xl font-bold">Personal Finance Management</h1>
				</header>
				: <header className="w-full px-3 py-3 bg-blue-600 text-white flex inline-block">
					{ subPage == null && <IoMenuOutline className="text-2xl font-bold cursor-pointer hover:bg-blue-500" onClick={(e) => setIsVisible(true)} />}
					{ subPage != null && <IoMdArrowRoundBack  className="text-2xl font-bold cursor-pointer hover:bg-blue-500" onClick={(e) => setSubPage(null) } />}
					 <h2 className="text-xl px-3 ">Personal Finance Management</h2>
				</header> }

				<Modal isVisible={isVisible} onClose={() => setIsVisible(true)}>
					<SlideBar />
				</Modal>
		</>
    )
}