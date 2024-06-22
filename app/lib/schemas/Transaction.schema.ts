"use server";

import {  Schema } from "mongoose";
import { mongoose } from "@/lib/db";
const TransactionSchema = new Schema ( 
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        amount: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },  // "income" or "expense"
        category: { type: String, required: true }, 
        date: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
)
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;