import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import {WeatherApi} from "../../api/Weather-api";


const initialState = {
    weather: [] as Array<WeatherDataType>,
    main: {} as MainDataType
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
        default:
            return state
    }
};

const action = {
    getWeatherSuccess: (weather: Array<WeatherDataType>, main: MainDataType) => ({
        type: 'GET_WEATHER',
        weather, main
    } as const),
};

export const getWeather = (lat: string, lon: string): ThunkType => async (dispatch) => {
    try {
        let data = await WeatherApi.getWeather(lat, lon);
        dispatch(action.getWeatherSuccess(data.weather, data.main))
    } catch (e) {
        console.table(e.message)
    }
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