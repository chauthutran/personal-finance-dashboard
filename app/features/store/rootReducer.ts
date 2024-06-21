import { combineReducers } from "redux";
import AuthenticateReducer from "@/features/auth/authReducer";
import StatusReducer from "@/features/status/StatusReducer";
import MainUiReducer from "@/features/mainUi/mainUiReducer";
import BudgetReducer from "@/features/budget/budgetReducer";


const rootReducer = combineReducers({
    statusData: StatusReducer,
    authData: AuthenticateReducer,
    mainUi: MainUiReducer,
    budget: BudgetReducer
});

export default rootReducer;