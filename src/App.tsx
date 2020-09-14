import React from 'react';
import './App.css';
import GeolocationInfo from "./Components/GeolocationInfo/GeolocationInfo";
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';
import {Preloader} from "./utils/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "./Components/redux/store";
import { LocalHistory } from './Components/LocalHistory/LocalHistory';


const App = () => {

    const preLoader = useSelector<AppStateType, boolean>(state => state.preloaderReducer.isFetching);
    return (
        <div>
            {preLoader ? <Preloader/> : null}
            <div className='App'>
                <div>
                    <GeolocationInfo/>
                    <WeatherInfo/>
                    <LocalHistory/>
                </div>
            </div>
        </div>
    )
};

export default App;
