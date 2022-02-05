import { combineReducers } from "redux";
import imgReducer from "./imgReducer";

const rootReducer = combineReducers({
  image: imgReducer,
});

export default rootReducer;
