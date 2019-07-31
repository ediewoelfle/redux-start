import { combineReducers } from "redux";
import { loggedReducer } from "./loggedReducer";
import { dataReducer } from "./dataReducer";
import { devicesReducer } from "./devicesReducer";

export const reducers = combineReducers({
  loggedReducer,
  dataReducer,
  devicesReducer
});
