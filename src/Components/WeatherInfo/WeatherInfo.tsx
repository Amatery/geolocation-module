import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getWeather} from "../redux/weather-reducer";
import {AppStateType} from "../redux/store";


const WeatherInfo = memo(() => {

    const {latitude, longitude} = useSelector((state: AppStateType) => state.geolocationReducer);
    const weather = useSelector<AppStateType, any>(state => state.weatherReducer.weather);
    const main = useSelector<AppStateType, any>(state => state.weatherReducer.main);
    const dispatch = useDispatch();


    useEffect(() => {
        if (latitude && longitude) {
            dispatch(getWeather(latitude, longitude));
        }
    }, [latitude, longitude]);


    const saveLsHandler = () => {
        debugger
        const weatherAsString = JSON.stringify(weather)
        localStorage.setItem('weather data', weatherAsString)
    }

    const getLsHandler = () => {
        debugger
        const weatherFromLs = localStorage.getItem('weather data');
        if (weatherFromLs) {
            const loadedData = JSON.parse(weatherFromLs)
        }
    };


    return (
        <div>
            <div>
                {weather.map((el: any) => {
                    return <p>{main.temp}C{'\u00b0'}, {el.description}</p>
                })}
            </div>
            <button onClick={saveLsHandler}>save to ls</button>
            <button onClick={getLsHandler}>get from ls</button>
        </div>
    )
});


export default WeatherInfo;