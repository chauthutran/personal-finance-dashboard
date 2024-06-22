/** Form component for setting or updating the user's budget */

"use client";
import useAppHook from '@/features/hooks';
import { JSONObject } from '@/lib/definations';
import React, { useState } from 'react';
import * as Utils from "@/lib/utils";
import DateField from '../basics/DateField';
import mongoose from 'mongoose';
import Dropdown from '../basics/Dropdown';
import Alert from '../basics/Alert';
import * as Constant from '@/lib/constants';
import { useBudget } from '@/contexts/BudgetContext';

export default function BudgetForm({ data = {} as JSONObject }) {

	const categories = [
		'Housing',
		'Utilities',
		'Food',
		'Transportation',
		'Entertainment',
		'Health',
		'Savings',
		'Debt Payments',
		'Miscellaneous'
	];

	const { userId, loading, error, saveBudget } = useBudget();

	const [budget, setBudget] = useState(data);

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

		budget.userId = new mongoose.Types.ObjectId(userId);
		saveBudget(budget);
	};

	const setTitle = () => {
		return (budget._id != undefined) ? "Edit budget" : "Add a new Budget";
	}


	return (
		<div className="h-[calc(100vh-120px)] mt-5 overflow-x-auto  border-gray-400 ">
			
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
							<Dropdown options={categories}
								className="w-full p-2 border border-gray-300 rounded"
								value={budget.category}
								handleOnChange={(e) => setValue("category", e.target.value)}
							/>
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
							<label className="block text-gray-700 mb-2" htmlFor="startDate">
								Start Date
							</label>
							<DateField
								id="startDate"
								handleOnChange={(date: Date | null) => setValue("startDate", date)}
								value={budget.startDate}
								className="w-full p-2 border border-gray-300 rounded"
								disabled={false}
							/>
						</div>


						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="startDate">
								End Date
							</label>
							<DateField
								id="endDate"
								handleOnChange={(date: Date | null) => setValue("endDate", date)}
								value={budget.startDate}
								className="w-full p-2 border border-gray-300 rounded"
								disabled={false}
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

