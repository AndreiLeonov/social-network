import {combineReducers, createStore, Store} from "redux";
import { profileReducer } from "./profileReducer";
import { messagesReducer } from "./messagesReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer
});

let store: Store = createStore(reducers);

export default store;