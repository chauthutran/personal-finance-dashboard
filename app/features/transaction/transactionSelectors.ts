
import { RootState } from "../store";
import { JSONObject } from "../../lib/definations";

export const getTransactionList = (state: RootState): JSONObject[] => state.transaction.transactionList;
