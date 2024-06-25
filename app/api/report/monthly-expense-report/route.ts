
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import Expense from "@/lib/schemas/Expense.schema";
import Income from "@/lib/schemas/Income.schema";
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


interface CategoryWiseExpense {
	category: string;
	totalAmount: number;
}


export async function GET(req: NextRequest, { params }) {
	const url = new URL(req.url);
	const searchValues = Utils.convertUrlSearchParamToJson(url.searchParams);
	const userId = searchValues.userId;
	const startDate = searchValues.startDate;
	const endDate = searchValues.endDate;

	// Check parametters
	let errArr: string[] = [];
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		errArr.push("Invalid user ID");
	}

	if (startDate == undefined || startDate == null ) {
		errArr.push("Start date is missing");
	}
	else if(!Utils.isValidDate(startDate) ) {
		errArr.push("Start date is invalid");
	}

	if (endDate == undefined || endDate == null ) {
		errArr.push("End date is missing");
	}
	else if(!Utils.isValidDate(endDate) ) {
		errArr.push("End date is invalid");
	}

	if( errArr.length > 0 ) {
		return NextResponse.json({message: errArr.join("; ")}, { status: 200 });
	}

	const categoryWiseExpenses: CategoryWiseExpense[] = await Expense.aggregate([
		{
			$match: {
			  date: {
				$gte: new Date(startDate),
				$lte: new Date(endDate)
			  }
			}
		  },
		  {
			$group: {
			  _id: {
				year: { $year: "$date" },
				month: { $month: "$date" }
			  },
			  totalAmount: { $sum: "$amount" },
			  expenses: { $push: "$$ROOT" },
			}
		  },
		  {
			$sort: { "_id.month": 1 }
		  },
		  {
			$project: {
			  _id: 0,
			  month: "$_id.month",
			  year: "$_id.year",
			  totalAmount: 1,
			  expenses: 1
			}
		  }
	]);

	return NextResponse.json(categoryWiseExpenses, { status: 200 });
}