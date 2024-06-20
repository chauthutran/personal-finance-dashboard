
import { RootState } from "../store";
import { JSONObject } from "../../lib/definations";

export const getCurrentUser = (state: RootState): JSONObject[] => state.authData.curUser;
