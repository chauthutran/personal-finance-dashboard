
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import Budget from "@/lib/schemas/Budget.schema";
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request: NextRequest, {params}) {
    const url = new URL(request.url);
    const searchValues: URLSearchParams = url.searchParams;
    
    const searchResult = await Budget.find( Utils.convertUrlSearchParamToJson(searchValues) );
    const userData = ( searchResult.length > 0 ) ? Utils.converDbObjectToJson(searchResult[0]) : {};

    return NextResponse.json(userData, {status: 200});
}


export async function POST( request: NextRequest ) {
    const payload: JSONObject = await request.json();

    const newBudget = await Budget.create(payload);

    return NextResponse.json(newBudget, {status: 200 })
}

export async function PUT( request: NextRequest, {params} ) {
    const { id } = params;
    const payload: JSONObject = await request.json();

    const newBudget = await Budget.findByIdAndUpdate(id, payload);

    return NextResponse.json(newBudget, {status: 200 })
}
