
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import Expense from "@/lib/schemas/Expense.schema";
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request: NextRequest, {params}) {
    const url = new URL(request.url);
	const searchValues = Utils.convertUrlSearchParamToJson( url.searchParams );
    
    const userId = searchValues.userId;
	if(  userId !== undefined ) {
		searchValues.userId = new mongoose.Types.ObjectId( userId as string );
	}
    
    const searchResult = await Expense.find(searchValues);

    const expenseList = ( searchResult.length > 0 ) ? Utils.converDbObjectToJson(searchResult) : [];

    return NextResponse.json(expenseList, {status: 200});
}


export async function POST( request: NextRequest ) {
    const payload: JSONObject = await request.json();

    payload.userId = new mongoose.Types.ObjectId(payload.userId as string);
    payload.categoryId = new mongoose.Types.ObjectId(payload.categoryId as string);
    const newExpense = await Expense.create(payload);

    return NextResponse.json(newExpense, {status: 200 })
}

export async function PUT( request: NextRequest, {params} ) {
    const payload: JSONObject = await request.json();

    // { new: true } --> return the modified document rather than the original one
    const newExpense = await Expense.findByIdAndUpdate(payload._id, payload, { new: true });

    return NextResponse.json(newExpense, {status: 200 })
}

export async function DELETE( request: NextRequest ) {
    const id = request.nextUrl.searchParams.get("id");

    await Expense.findByIdAndDelete(id);
    return NextResponse.json({message: "Expense is deleted."}, {status: 200});
}