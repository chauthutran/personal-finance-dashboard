/** Displays individual budget details with options to edit or delete. */

"use client";
import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";

export default function BudgetItem({data} : {data: JSONObject}) {

    // userId: { type: String, required: true },
    // category: { type: String, required: true },
    // amount: { type: String, required: true },
    // start_date: { type: Date, required: true },
    // end_date: { type: Date, required: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt

    return (
        <div key={data._id} className="m-1 grid min-h-[100px] cursor-pointer grid-cols-[10%_80%_10%] gap-1 rounded-lg bg-gray-200 p-2 text-gray-700 shadow-lg hover:bg-blue-200">
        <div className="flex items-center p-1 align-middle">
            <img className="" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="" title="" />
        </div>
        <div className="p-1">
            <div className="min-h-[20px] font-semibold">{data.amount}</div>
            <div className="min-h-[20px]">budget.category</div>
            <div className="min-h-[20px]">Date: {Utils.formatDate(data.startDate)} - {Utils.formatDate(data.endDate)}</div>
        </div>
    </div>
    )
}