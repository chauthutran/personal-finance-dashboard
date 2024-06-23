"use server";

import { Schema } from "mongoose";
import { mongoose } from "@/lib/db";

const IncomeSchema = new Schema({
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


const Income = mongoose.models.Income || mongoose.model('Income', IncomeSchema);

export default Income;