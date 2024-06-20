import { combineReducers } from "redux";
import AuthenticateReducer from "@/features/auth/authReducer";
import StatusReducer from "@/features/status/StatusReducer";
import MainUiReducer from "@/features/mainUi/mainUiReducer";


const rootReducer = combineReducers({
    statusData: StatusReducer,
    authData: AuthenticateReducer,
    mainUi: MainUiReducer
});

export default rootReducer;