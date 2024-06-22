
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import Budget from "@/lib/schemas/Budget.schema";
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request: NextRequest, {params}) {
    const url = new URL(request.url);
	const searchValues = Utils.convertUrlSearchParamToJson( url.searchParams );
    
    const userId = searchValues.userId;
	if(  userId != undefined ) {
		searchValues.userId = new mongoose.Types.ObjectId( userId as string );
	}

    console.log("---------------- searchValues");
    console.log(searchValues);
    // const searchResult = await Budget.find(searchValues);
    const searchResult = await Budget.find({userId: new mongoose.Types.ObjectId( userId as string )});


    const userData = ( searchResult.length > 0 ) ? Utils.converDbObjectToJson(searchResult) : [];

    return NextResponse.json(userData, {status: 200});
}


export async function POST( request: NextRequest ) {
    const payload: JSONObject = await request.json();

    const newBudget = await Budget.create(payload);

    return NextResponse.json(newBudget, {status: 200 })
}

export async function PUT( request: NextRequest, {params} ) {
    const payload: JSONObject = await request.json();

    const newBudget = await Budget.findByIdAndUpdate(payload._id, payload);

    return NextResponse.json(newBudget, {status: 200 })
}
