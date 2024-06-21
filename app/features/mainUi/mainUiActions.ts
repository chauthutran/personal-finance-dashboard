import { JSONObject } from "@/lib/definations";
import * as Constant from "@/lib/constants";


export const setMainPage = (uiName: string) => {
    return {
        type: Constant.SET_MAIN_PAGE,
        payload: uiName
    }
}

export const setSubPage = (uiName: string) => {
    return {
        type: Constant.SET_SUB_PAGE,
        payload: uiName
    }
}

