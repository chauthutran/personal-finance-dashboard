
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import User  from '@/lib/schemas/User.schema';
import * as Utils from "@/lib/utils";
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET( request, {params}) {
    const url = new URL(request.url);
    const searchValues: URLSearchParams = url.searchParams;
    
    const searchResult = await User.find( Utils.convertUrlSearchParamToJson(searchValues) );
    const userData = ( searchResult.length > 0 ) ? Utils.converDbObjectToJson(searchResult[0]) : {};


    return NextResponse.json(userData, {status: 200});
}
