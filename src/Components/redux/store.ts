import {applyMiddleware, combineReducers, createStore} from "redux";
import {GeolocationReducer} from "./geolocation-info-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    geolocationReducer: GeolocationReducer
});


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionTypes<T> = T extends{ [keys: string]: (...args: any[]) => infer U} ? U : never