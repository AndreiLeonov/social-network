import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import { profileReducer } from "./profileReducer";
import { messagesReducer } from "./messagesReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk"

type reducersType = typeof reducers;

export type AppStateType = ReturnType<reducersType>

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer
});

let store: Store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;