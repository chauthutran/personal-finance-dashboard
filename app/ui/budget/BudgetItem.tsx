/** Displays individual budget details with options to edit or delete. */

"use client";
import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import * as AppStore from "@/lib/appStore";
import * as Constant from "@/lib/constants";
import { AiFillDollarCircle } from "react-icons/ai";
import { useMainUi } from "@/contexts/MainUiContext";


export default function BudgetItem({data} : {data: JSONObject}) {

    const { setSubPage } = useMainUi();

    const setSelectedBudget = () => {
        AppStore.setSelected(data);
        setSubPage( Constant.SUB_UI_EDIT_FORM );
    }

    return (
        <div key={data._id} onClick={() => setSelectedBudget()} className="m-1 grid min-h-[100px] cursor-pointer grid-cols-[10%_80%_10%] gap-1 rounded-lg bg-gray-200 p-2 text-gray-700 shadow-lg hover:bg-blue-200">
            <div className="flex items-center p-1 align-middle">
                <AiFillDollarCircle className="text-5xl text-yellow-600" />
            </div>
            <div className="p-1">
                <div className="min-h-[20px] font-semibold">{data.category} - ${data.amount}</div>
                <div className="min-h-[20px]">{data.description }</div>
                <div className="min-h-[20px]">From {Utils.formatDate(data.startDate)} to {Utils.formatDate(data.endDate)}</div>
            </div>
        </div>
    )
}