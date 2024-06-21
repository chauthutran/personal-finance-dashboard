
import { RootState } from "../store";
import { JSONObject } from "../../lib/definations";

export const getBudgetList = (state: RootState): JSONObject[] => state.budget.budgetList;
