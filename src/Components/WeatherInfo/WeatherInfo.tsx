import React, {memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getWeather} from "../redux/weather-reducer";
import {AppStateType} from "../redux/store";


const WeatherInfo = memo(() => {

    const {latitude, longitude} = useSelector((state: AppStateType) => state.geolocationReducer);

    // const {
    //     weather: [main, description],
    //     main: {temp}
    // } = useSelector((state: AppStateType) => state.weatherReducer);

    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(getWeather(latitude, longitude));
    };


    return (
        <div>
            <div>
                {/*<p>Weather: {main},{description},{temp}</p>*/}
                <button onClick={clickHandler}>Get Temp</button>
            </div>
        </div>
    )
});


export default WeatherInfo;