import {ThunkAction} from "redux-thunk";
import {getAddressApi} from "../../api/GeoData-api";
import {AppStateType, InferActionTypes} from "./store";

type ActionTypes = InferActionTypes<typeof action>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

// type UserAddress = {
//     description: string,
//     name: string
// }

const initialState = {
    latitude: '' ,
    longitude: '' ,
    userAddress: {
        description: '',
        name: ''
    }
};

type InitialStateType = typeof initialState;

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
    } as const)
};


export const getAddress = (longitude: any, latitude: any): ThunkType => async (dispatch) => {
    try {
        let data = await getAddressApi.getUserAddress(latitude, longitude);
        dispatch(action.getUserAddressSuccess(data.response.GeoObjectCollection.featureMember[0].GeoObject))
    } catch (e) {
        console.table(e.message)
    }

};
