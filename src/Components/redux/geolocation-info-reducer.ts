import {ThunkAction} from "redux-thunk";
import {getAddressApi} from "../../api/GeoData-api";
import {AppStateType, InferActionTypes} from "./store";
import {Dispatch} from "redux";


const initialState = {
    latitude: '',
    longitude: '',
    userAddress: {
        description: '',
        name: ''
    },
    isFetching: false as boolean,
    historyUserAddress: [] as any
};


export const GeolocationReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'SET_COORDINATES': {
            return {
                ...state,
                latitude: action.latitude,
                longitude: action.longitude
            }
        }
        case 'GET_USER_ADDRESS': {
            return {
                ...state,
                userAddress: action.userAddress
            }
        }
        case 'HISTORY_USER_ADDRESS': {
            return {
                ...state,
                historyUserAddress: [...state.historyUserAddress, ...action.historyUserAddress]
            }
        }
        default:
            return state
    }
};

export const action = {
    setCoordinatesSuccess: (latitude: string, longitude: string) => ({
        type: 'SET_COORDINATES',
        latitude, longitude
    } as const),
    getUserAddressSuccess: (userAddress: any) => ({
        type: 'GET_USER_ADDRESS',
        userAddress
    } as const),
    toggleIsFetchingSuccess: (isFetching: boolean) => ({
        type: 'IS_FETCHING',
        isFetching
    } as const),
    historyUserAddressSuccess: (historyUserAddress: any) => ({
        type: 'HISTORY_USER_ADDRESS',
        historyUserAddress
    } as const)
};


export const getAddress = (longitude: any, latitude: any): ThunkType => async (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(action.toggleIsFetchingSuccess(true));
    let userAddressParse = localStorage.getItem('user address');
    if (userAddressParse) {
        dispatch(action.historyUserAddressSuccess(JSON.parse(userAddressParse)))
    }
    try {
        let data = await getAddressApi.getUserAddress(latitude, longitude);
        const userAddressState = getState().geolocationReducer.historyUserAddress;
        localStorage.setItem('user address', JSON.stringify([...userAddressState, data.response.GeoObjectCollection.featureMember[0]]));
        dispatch(action.getUserAddressSuccess(data.response.GeoObjectCollection.featureMember[0].GeoObject));
    } catch (e) {
        console.table(e.message)
    }
    dispatch(action.toggleIsFetchingSuccess(false));
};

//Types
type ActionTypes = InferActionTypes<typeof action>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
type InitialStateType = typeof initialState;