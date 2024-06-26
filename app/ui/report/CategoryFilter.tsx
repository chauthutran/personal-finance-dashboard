import { useCategory } from '@/contexts/CategoryContext';
import React from 'react';

const categories = [
	{ id: 'income', name: 'Income' },
	{ id: 'expense', name: 'Expense' },
	// Add more categories as needed
];

const CategoryFilter = ({ label, id, selectedCategory, onCategoryChange }) => {

	const { categoryList } = useCategory();

	return (
		<div>
			<label className="block text-gray-700 mb-2 text-sm" htmlFor={id}>{label}</label>
			<select
				id={id}
				value={selectedCategory}
				onChange={e => onCategoryChange(e.target.value)}
				className="w-full p-2 border border-gray-300 rounded" >
					<option value="">[Please select]</option>
					{categoryList!.map(category => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
			</select>
		</div>
	);
};

export default CategoryFilter;
