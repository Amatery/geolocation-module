import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import {WeatherApi} from "../../api/Weather-api";


const initialState = {
    weather: [] as Array<WeatherDataType>,
    main: {} as MainDataType,
    isFetching: false as boolean
};

export const WeatherReducer = (state: InitialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'GET_WEATHER': {
            return {
                ...state,
                weather: action.weather,
                main: action.main
            }
        }
        case 'IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state
    }
};

const action = {
    getWeatherSuccess: (weather: Array<WeatherDataType>, main: MainDataType) => ({
        type: 'GET_WEATHER',
        weather, main
    } as const),
    toggleIsFetchingSuccess: (isFetching: boolean) => ({
        type: 'IS_FETCHING',
        isFetching
    } as const)
};

export const getWeather = (lat: string, lon: string): ThunkType => async (dispatch) => {
    await dispatch(action.toggleIsFetchingSuccess(true));
    try {
        let data = await WeatherApi.getWeather(lat, lon);
        dispatch(action.getWeatherSuccess(data.weather, data.main))
    } catch (e) {
        console.table(e.message)
    }
    await dispatch(action.toggleIsFetchingSuccess(false));
};


//Types
export type WeatherDataType = {
    id: number,
    main: string,
    description: string,
    icon: string
}

export type MainDataType = {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

type ActionTypes = InferActionTypes<typeof action>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
type InitialStateType = typeof initialState