
import { RootState } from "@/features/store";
import { JSONObject } from "@/lib/definations";

export const getStatusData = (state: RootState): JSONObject => state.statusData;