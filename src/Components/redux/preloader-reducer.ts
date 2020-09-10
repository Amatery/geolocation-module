import {InferActionTypes} from "./store";


const initialState = {
    isFetching: false
};


export const PreloaderReducer = (state: InitialStateType = initialState, actionPreloader: ActionTypes) => {
    switch (actionPreloader.type) {
        case 'IS_FETCHING': {
            return {
                ...state,
                isFetching: actionPreloader.isFetching
            }
        }
        default:
            return state;
    }
};

export const actionPreloader = {
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'IS_FETCHING',
        isFetching
    } as const)
};

//Types

type ActionTypes = InferActionTypes<typeof actionPreloader>
type InitialStateType = typeof initialState;