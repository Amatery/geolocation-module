import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import {WeatherApi} from "../../api/Weather-api";
import {Dispatch} from "redux";


const initialState = {
    weather: [] as Array<WeatherDataType>,
    main: {} as MainDataType,
    isFetching: false as boolean,
    weatherLS: [] as any,
    mainLS: [] as any,
    dateTimeLS: [] as any
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
        case 'WEATHER_LS': {
            return {
                ...state,
                weatherLS: [...state.weatherLS, ...action.weatherLS]
            }
        }
        case 'MAIN_LS': {
            return {
                ...state,
                mainLS: [...state.mainLS, ...action.mainLS]
            }
        }
        case 'DATE_TIME_LS': {
            return {
                ...state,
                dateTimeLS: [...state.dateTimeLS, ...action.dateTimeLS]
            }
        }
        default:
            return state
    }
};

export const action = {
    getWeatherSuccess: (weather: Array<WeatherDataType>, main: MainDataType) => ({
        type: 'GET_WEATHER',
        weather, main
    } as const),
    toggleIsFetchingSuccess: (isFetching: boolean) => ({
        type: 'IS_FETCHING',
        isFetching
    } as const),
    weatherLSSuccess: (weatherLS: any) => ({
        type: 'WEATHER_LS',
        weatherLS
    } as const),
    mainLSSuccess: (mainLS: any) => ({
        type: 'MAIN_LS',
        mainLS
    } as const),
    dateTimeLSSuccess: (dateTimeLS: any) => ({
        type: 'DATE_TIME_LS',
        dateTimeLS
    }as const)
};


export const getWeather = (lat: string, lon: string): ThunkType => async (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(action.toggleIsFetchingSuccess(true));
    let date = new Date();
    let datesInfo = {
        year:date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes()};

    console.log(datesInfo)
    let dateParse = localStorage.getItem('date data')
    if(dateParse) {
        dispatch(action.dateTimeLSSuccess(JSON.parse(dateParse)))
    }
    let weatherDataParse = localStorage.getItem('weather data');
    if (weatherDataParse) {
        dispatch(action.weatherLSSuccess(JSON.parse(weatherDataParse)));
    }
    let mainDataParse = localStorage.getItem('main data');
    if (mainDataParse) {
        dispatch(action.mainLSSuccess(JSON.parse(mainDataParse)));
    }
    try {
        let data = await WeatherApi.getWeather(lat, lon);
        const weatherState = getState().weatherReducer.weatherLS;
        const mainState = getState().weatherReducer.mainLS;
        const dateState = getState().weatherReducer.dateTimeLS
        localStorage.setItem('weather data', JSON.stringify([...weatherState, data.weather[0]]));
        localStorage.setItem('main data', JSON.stringify([...mainState, data.main.temp]));
        localStorage.setItem('date data', JSON.stringify([...dateState, datesInfo]))
        dispatch(action.getWeatherSuccess(data.weather, data.main));
    } catch (e) {
        console.table(e.message)
    }
    dispatch(action.toggleIsFetchingSuccess(false));
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