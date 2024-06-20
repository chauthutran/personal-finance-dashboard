
import { RootState } from "../store";
import * as Utils from '@/lib/utils';
import { JSONObject } from "../../lib/definations";

export const getMainUi = (state: RootState): string => state.mainUi.currentUI;
