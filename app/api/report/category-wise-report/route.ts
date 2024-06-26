
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import Expense from "@/lib/schemas/Expense.schema";
import Income from "@/lib/schemas/Income.schema";
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import * as Constant from "@/lib/constants";
import Budget from "@/lib/schemas/Budget.schema";
 
interface CategoryWiseData {
	category: string;
	name: string;
	totalAmount: number;
	details: JSONObject[],
}


export async function POST( request: NextRequest ) {

	const payload: JSONObject = await request.json();

	// Check parametters
	let errArr: string[] = [];
	if (!mongoose.Types.ObjectId.isValid(payload.userId)) {
		errArr.push("Invalid user ID");
	}

	if (payload.startDate == undefined ) {
		errArr.push("Start date is missing");
	}
	else if(!Utils.isValidDate(payload.startDate) ) {
		errArr.push("Start date is invalid");
	}

	if (payload.endDate == undefined ) {
		errArr.push("End date is missing");
	}
	else if(!Utils.isValidDate(payload.endDate) ) {
		errArr.push("End date is invalid");
	}

	if (payload.dataFrom == undefined 
		|| (payload.dataFrom.indexOf("income") < 0 
			&& payload.dataFrom.indexOf("budget") < 0  
			&& payload.dataFrom.indexOf("expense") < 0 ) ) {
		errArr.push(`Please define at least one 'dataFrom', such as 'income', 'budget' or 'expense'`);
	}

	if( errArr.length > 0 ) {
		return NextResponse.json({errMsg: errArr.join("; ")}, { status: 200 });
	}

	let reportData: JSONObject = {};
	if( payload.dataFrom.indexOf("income") >= 0 ) {
		reportData.incomeData = await getCategoryWiseIncomeData(payload.userId, payload.startDate, payload.endDate);
	}
	
	if( payload.dataFrom.indexOf("expense") >= 0 ) {
		reportData.expenseData = await getCategoryWiseExpenseData(payload.userId, payload.startDate, payload.endDate);
	}

	if( payload.dataFrom.indexOf("budget") >= 0 ) {
		reportData.budgetData = await getCategoryWiseBudgetData(payload.userId, payload.startDate, payload.endDate);
	}
	
	return NextResponse.json(reportData, { status: 200 });
}


const getCategoryWiseIncomeData = async(userId: string, startDate: string, endDate: string): Promise<CategoryWiseData[]> => {
	const categoryWiseData: CategoryWiseData[] = await Income.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				date: {
					$gte: new Date(startDate),
					$lte: new Date(endDate)
				},
			}
		},
		{
			$lookup: {
				from: 'categories',
				localField: 'categoryId',
				foreignField: '_id',
				as: 'categoryInfo'
			}
		},
		{
			$unwind: '$categoryInfo'
		},
		{
			$group: {
				_id: '$categoryId',
				totalAmount: { $sum: '$amount' },

				categoryType: { $first: "$categoryInfo.type" },
				name: { $first: "$categoryInfo.name" }
			},
		},
		{
			$project: {
				_id: 0,
				category: '$_id',
				totalAmount: 1,
				categoryType: 1,
				name: 1
			},
		},
	]);
	
	return categoryWiseData;
}

const getCategoryWiseExpenseData = async(userId: string, startDate: string, endDate: string): Promise<CategoryWiseData[]> => {
	const categoryWiseData: CategoryWiseData[] = await Expense.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				date: {
					$gte: new Date(startDate),
					$lte: new Date(endDate)
				},
			}
		},
		{
			$lookup: {
				from: 'categories',
				localField: 'categoryId',
				foreignField: '_id',
				as: 'categoryInfo'
			}
		},
		{
			$unwind: '$categoryInfo'
		},
		{
			$group: {
				_id: '$categoryId',
				totalAmount: { $sum: '$amount' },

				categoryType: { $first: "$categoryInfo.type" },
				name: { $first: "$categoryInfo.name" }
			},
		},
		{
			$project: {
				_id: 0,
				category: '$_id',
				totalAmount: 1,
				categoryType: 1,
				name: 1
			},
		},
	]);

	
	return categoryWiseData;
}

const getCategoryWiseBudgetData = async(userId: string, startDate: string, endDate: string): Promise<CategoryWiseData[]> => {
	const startMonth = parseInt( startDate.substring(5, 7) );
	const startYear = parseInt( startDate.substring(0, 4));
	const endMonth = parseInt( endDate.substring(5, 7) );
	const endYear = parseInt( endDate.substring(0, 4) );

	const categoryWiseData: CategoryWiseData[] = await Budget.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				month: {
					$gte: startMonth,
					$lte: endMonth
				},
				year: {
					$gte: startYear,
					$lte: endYear
				},
			}
		},
		{
			$lookup: {
				from: 'categories',
				localField: 'categoryId',
				foreignField: '_id',
				as: 'categoryInfo'
			}
		},
		{
			$unwind: '$categoryInfo'
		},
		{
			$group: {
				_id: '$categoryId',
				totalAmount: { $sum: '$amount' },
				categoryType: { $first: "$categoryInfo.type" },
				name: { $first: "$categoryInfo.name" },
				details: { $push: "$$ROOT" },
			},
		},
		{
			$project: {
				_id: 0,
				category: '$_id',
				totalAmount: 1,
				categoryType: 1,
				name: 1
			},
		},
	]);

	return categoryWiseData;
}
