/** Form component for setting or updating the user's budget */

"use client";
import useAppHook from '@/features/hooks';
import { JSONObject } from '@/lib/definations';
import React, { useState } from 'react';
import * as Utils from "@/lib/utils";

export default function BudgetForm({ userId, data = {} as JSONObject}) {

	const { saveBudget, setSubPage } = useAppHook();

	const [budget, setBudget] = useState(data);

	const setValues = (propName: string, value: string | Date) => {
		const tempData = Utils.cloneJSONObject(budget);
		tempData[propName] = value;

		setBudget(tempData);
	}

	const handleOnSave = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		budget.userId = userId;
		console.log(budget);
		saveBudget(budget);
	};

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

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded shadow-md w-full max-w-md">
				<h2 className="text-2xl mb-4 text-center">Add a New Budget</h2>
				<div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="name">
							Budget Name
						</label>
						<input
							type="text"
							id="name"
							value={budget.budgetName}
							onChange={(e) => setValues("name", e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="amount">
							Amount
						</label>
						<input
							type="number"
							id="amount"
							value={budget.amount}
							onChange={(e) => setValues("amount", e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="category">
							Category
						</label>
						<select
							id="category"
							value={budget.category}
							onChange={(e) => setValues("category", e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
							required
						>
							<option value="">[Please select]</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
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
							onChange={(e) => setValues("description", e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
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
	);
};

