
import { RootState } from "../store";
import * as Utils from '@/lib/utils';
import { JSONObject } from "../../lib/definations";

export const getMainPage = (state: RootState): string => state.mainPage.mainPage;
export const getSubPage = (state: RootState): string => state.mainPage.subPage;
