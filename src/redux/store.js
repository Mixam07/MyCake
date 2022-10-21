import { createStore, combineReducers } from "redux";
import mainReducer from "./reducers/main-reducer";

const reducers = combineReducers({
    mainPage: mainReducer
});

const store = createStore(reducers);

window.store = store;
export default store;