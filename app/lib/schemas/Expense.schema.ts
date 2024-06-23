"use server";

import {  Schema } from "mongoose";
import { mongoose } from "@/lib/db";

const ExpenseSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	description: {
		type: String,
	},
}, { timestamps: true });
const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

export default Expense;