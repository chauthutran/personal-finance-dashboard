/** Displays individual budget details with options to edit or delete. */

"use client";
import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as AppStore from "@/lib/appStore";
import * as Constant from "@/lib/constants";
import { AiFillDollarCircle } from "react-icons/ai";
import { useMainUi } from "@/contexts/MainUiContext";
import { FaTrash, FaShoppingCart, FaUtensils, FaHome, FaCar } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useBudget } from "@/contexts/BudgetContext";
import Alert from "../basics/Alert";

const categoryIcons: Record<string, IconType> = {
	groceries: FaShoppingCart,
	food: FaUtensils,
	rent: FaHome,
	car: FaCar,

	'Housing': FaHome,
	// 'Utilities': ,
	'Food': FaUtensils,
	// 'Transportation',
	// 'Entertainment',
	'Groceries': FaShoppingCart,
	// 'Health',
	// 'Savings',
	// 'Debt Payments'
};


export default function BudgetItem({ data }: { data: JSONObject }) {

	const { subPage, setSubPage } = useMainUi();
	const { error, processingStatus, deleteBudget } = useBudget();
console.log("================= subPage");
console.log(subPage);
	const setSelectedBudget = () => {
		AppStore.setSelected(data);
		setSubPage(Constant.SUB_UI_EDIT_FORM);
	}

	const handleOnDelete = () => {
		const ok = confirm(`Are you sure you want to delete this budget ${data.description} ?`);
		if (ok) {
			deleteBudget(data._id);
		}
	}

	const Icon = categoryIcons[data.category] || FaShoppingCart;

	return (
		<>
			{processingStatus == Constant.DELETE_BUDGET_SUCCESS && <Alert type={Constant.ALERT_TYPE_INFO} message={`Deleted successfully.`} />}
			{processingStatus == Constant.DELETE_BUDGET_FAILURE && <Alert type={Constant.ALERT_TYPE_ERROR} message={`Deleted Failed. ${error}`} />}

			{/* <div key={data._id} className="p-3 py-3 min-h-[100px] flex items-center justify-between hover:bg-blue-200 cursor-pointer">
            <div className="flex items-center space-x-5 flex-1" onClick={() => setSelectedBudget()} >

                <Icon className="text-green-500 shadow-md w-6 h-6" />
                <div className="flex-1">
                  <div className="text-lg font-medium text-gray-900 flex-1">{data.description}</div>
                  <div className="mt-1 text-gray-500">{data.month} - {data.year}</div>
                  <div className="mt-1 text-gray-900 font-semibold">${data.amount}</div>
                </div>

            </div>
            <button
              onClick={() => handleOnDelete()}
              className="text-red-500 hover:text-red-700 w-6"
            >
              <FaTrash className="w-6 h-6" />
            </button>
          </div> */}

			<div key={data._id} className="p-3 py-3 min-h-[100px] flex items-center justify-between hover:bg-blue-200 cursor-pointer">
				<div className="flex items-center space-x-5 flex-1" onClick={() => setSelectedBudget()} >
					<Icon className="text-green-500 shadow-md w-6 h-6" />
					<div className="flex-1">
						<div className="text-lg font-medium text-gray-900">{data.description}</div>
						<div className="mt-1 text-gray-500">{data.month} - {data.year}</div>
						<div className="mt-1 text-gray-900 font-semibold">${data.amount}</div>
					</div>
				</div>
				<button
					onClick={() => handleOnDelete()}
					className="text-red-500 hover:text-red-700 w-6"
				>
					<FaTrash className="w-6 h-6" />
				</button>
			</div>
		</>
	)
}