import { combineReducers } from "redux";
import AuthenticateReducer from "@/features/auth/authReducer";
import StatusReducer from "@/features/status/StatusReducer";
import MainUiReducer from "@/features/mainUi/mainUiReducer";
import BudgetReducer from "@/features/budget/budgetReducer";
import TransactionReducer from "@/features/transaction/transactionReducer";


const rootReducer = combineReducers({
    statusData: StatusReducer,
    authData: AuthenticateReducer,
    mainPage: MainUiReducer,
    budget: BudgetReducer,
    transaction: TransactionReducer
});

export default rootReducer;