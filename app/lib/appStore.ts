import { JSONObject } from "./definations";

let data : JSONObject = {};
export const setSelected = (obj: JSONObject) => {
    data = obj;
}

export const getSelected = () => {
    return data;
}