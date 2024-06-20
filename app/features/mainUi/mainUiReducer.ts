import * as Constant from "@/lib/constants";
import { ActionType } from '@/lib/definations';
import * as Utils from "@/lib/utils";

const initialState = {
    currentUI: Constant.UI_LOGIN_PAGE
}

const MainUiReducer = (state = initialState, action: ActionType) => {
    
	let newState = Utils.cloneJSONObject(state);

    if( action.type == Constant.SET_MAIN_PAGE ) {
        newState.currentUI = action.payload;

        return newState;
    }

    return state;
}

export default MainUiReducer;
