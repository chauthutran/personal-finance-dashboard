import * as Constant from "@/lib/constants";
import { ActionType } from '@/lib/definations';
import * as Utils from "@/lib/utils";

const initialState = {
    mainPage: Constant.UI_INTRO_PAGE,
    subPage: null
}

const MainUiReducer = (state = initialState, action: ActionType) => {
    
	let newState = Utils.cloneJSONObject(state);

    if( action.type == Constant.SET_MAIN_PAGE ) {
        newState.mainPage = action.payload;
        newState.subPage = null;

        return newState;
    }
    else if( action.type == Constant.SET_SUB_PAGE ) {
        newState.subPage = action.payload;

        return newState;
    }

    return state;
}

export default MainUiReducer;
