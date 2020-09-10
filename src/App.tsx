import React from 'react';
import './App.css';
import GeolocationInfo from "./Components/GeolocationInfo/GeolocationInfo";
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';
import {Preloader} from "./utils/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "./Components/redux/store";


const App = () => {

    const preLoader = useSelector<AppStateType, boolean>(state => state.preloaderReducer.isFetching);
    return (
        <div>
                {preLoader ? <Preloader/> : null}
                <div className='App'>
                    <div>
                        <GeolocationInfo/>
                        <WeatherInfo/>
                    </div>
                </div>
        </div>
    )
};

export default App;
