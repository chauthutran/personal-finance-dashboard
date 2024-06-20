"use server";

import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import User  from '@/lib/schemas/User.schema';
import * as Utils from "@/lib/utils";

export const findUserByUsernameAndPassword = async(username: string, password: string): Promise<JSONObject | null> => {
      
    const found = await User.find({
        username,
        password
    });
    
    return ( found.length > 0 ) ? Utils.converDbObjectToJson(found[0]) : null;
}