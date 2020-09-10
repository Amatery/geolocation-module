import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getWeather} from "../redux/weather-reducer";
import {AppStateType} from "../redux/store";


const WeatherInfo = memo(() => {

    const {latitude, longitude} = useSelector((state: AppStateType) => state.geolocationReducer);
    const weather = useSelector<AppStateType, any>(state => state.weatherReducer.weather);
    const main = useSelector<AppStateType, any>(state => state.weatherReducer.main);
    const dispatch = useDispatch();

    // const clickHandler = () => {
    //     dispatch(getWeather(latitude, longitude));
    // };


    useEffect(() => {
        if (latitude && longitude) {
            dispatch(getWeather(latitude, longitude));
        }
    }, [latitude, longitude]);


    return (
        <div>
            <div>
                {weather.map((el: any) => {
                    return <p>{main.temp} градусов, {el.description}</p>
                })}
            </div>
        </div>
    )
});


export default WeatherInfo;