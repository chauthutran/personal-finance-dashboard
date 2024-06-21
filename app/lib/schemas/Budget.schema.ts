"use server";

import {  Schema } from "mongoose";
import { mongoose } from "@/lib/db";
const BudgetSchema = new Schema ( 
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: false },
        category: { type: String, required: true },
        amount: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
)
const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);

export default Budget;