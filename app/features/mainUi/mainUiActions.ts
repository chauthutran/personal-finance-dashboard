import { JSONObject } from "@/lib/definations";
import * as Constant from "@/lib/constants";


export const setCurrentUi = (uiName: string) => {
    return {
        type: Constant.SET_MAIN_PAGE,
        payload: uiName
    }
}

