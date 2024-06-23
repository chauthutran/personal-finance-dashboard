/** Form component for setting or updating the user's budget */

"use client";
import { JSONObject } from '@/lib/definations';
import React, { useEffect, useState } from 'react';
import * as Utils from "@/lib/utils";
import DateField from '../basics/DateField';
import mongoose from 'mongoose';
import Dropdown from '../basics/Dropdown';
import Alert from '../basics/Alert';
import * as Constant from '@/lib/constants';
import { useBudget } from '@/contexts/BudgetContext';
import { useMainUi } from '@/contexts/MainUiContext';
import * as AppStore from "@/lib/appStore";
import { useCategory } from '@/contexts/CategoryContext';

export default function BudgetForm({ data = {} as JSONObject }) {

	// const categories = [
	// 	'Housing',
	// 	'Utilities',
	// 	'Food',
	// 	'Transportation',
	// 	'Entertainment',
	// 	'Groceries',
	// 	'Health',
	// 	'Savings',
	// 	'Debt Payments'
	// ];

	const { setSubPage } = useMainUi();
	const { categoryList } = useCategory();
	const { userId, processingStatus, setProcessingStatus, error, saveBudget, newBudget } = useBudget();

	const [budget, setBudget] = useState(data);

	useEffect(() => {
		if( processingStatus === Constant.SAVE_BUDGET_SUCCESS ) {
			setProcessingStatus("");
			setSubPage( null );
		}
	}, [processingStatus]);

	const setValue = (propName: string, value: string | Date | null) => {
		var tempData = Utils.cloneJSONObject(budget);
		if (value == null) {
			tempData[propName] = "";
		}
		else if (value instanceof Date) {
			tempData[propName] = value.toISOString();
		}
		else {
			tempData[propName] = value;
		}

		setBudget(tempData);
	}

	const handleOnSave = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		budget.userId = userId;
		saveBudget(budget);
	};

	const setTitle = () => {
		return (budget._id != undefined) ? "Edit budget" : "Add a new Budget";
	}


	return (
		<div className="h-[calc(100vh-120px)] mt-5 overflow-x-auto  border-gray-400 ">
			
			{processingStatus == Constant.SAVE_BUDGET_SUCCESS && <Alert type={Constant.ALERT_TYPE_INFO} message={`Saved successfully.`} />}
			{processingStatus == Constant.SAVE_BUDGET_FAILURE && <Alert type={Constant.ALERT_TYPE_ERROR} message={`Saving data is failed. ${error}`} />}

			<div className="flex items-center justify-center ">
				<div className="p-6 rounded border-2 bg-slate-100 shadow-md w-full max-w-md">
					<h2 className="text-2xl mb-4 text-center">{setTitle()}</h2>

					<div>
						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="amount">
								Amount
							</label>
							<input
								type="number"
								id="amount"
								value={budget.amount}
								onChange={(e) => setValue("amount", e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="category">
								Category
							</label>
							<select
								id="categoryId"
								onChange={(e) => setValue("categoryId", e.target.value)}
								value={budget.categoryId}
								className="w-full p-2 border border-gray-300 rounded"
							>
								{categoryList && categoryList?.map((category: JSONObject) => (
									<option value={category._id}>({category.type}) - {category.name}</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="description">
								Description
							</label>
							<textarea
								id="description"
								value={budget.description}
								onChange={(e) => setValue("description", e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="month">
								Month
							</label>
							<select
								id="month"
								onChange={(e) => setValue("month", e.target.value)}
								value={budget.month}
								className="w-full p-2 border border-gray-300 rounded"
							>
								<option value="">[Please select]</option>
								<option value="1">Jan</option>
								<option value="2">Feb</option>
								<option value="3">Mar</option>
								<option value="4">Apr</option>
								<option value="5">May</option>
								<option value="6">Jun</option>
								<option value="7">Jul</option>
								<option value="8">Aug</option>
								<option value="9">Sep</option>
								<option value="10">Oct</option>
								<option value="11">Nov</option>
								<option value="12">Dec</option>
							</select>
						</div>


						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="startDate">
								Year
							</label>
							<input
								type="number"
								id="year"
								value={budget.year}
								onChange={(e) => setValue("year", e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
								required
							/>
						</div>


						<div className="flex justify-between items-center">
							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
								onClick={(e) => handleOnSave(e)}
							>
								Save
							</button>
							<button
								type="button"
								onClick={() => setBudget(data)}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
							>
								Reset
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

