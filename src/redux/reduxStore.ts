import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from "redux-thunk";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
	profilePage: profileReducer,
	messagesPage: messagesReducer,
	sideBar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer,
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U}	? U	: never


//@ts-ignore
//with "redux" browser extension,store with middle layer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export type AppDispatch = typeof store.dispatch 
//without any browser extension
//let store = createStore(reducers, applyMiddleware());
//@ts-ignore
window.__store__ = store;
export default store;