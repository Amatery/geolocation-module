import React from 'react';
import './App.css';
import GeolocationInfo from "./Components/GeolocationInfo/GeolocationInfo";
import WeatherInfo from './Components/WeatherInfo/WeatherInfo';

const App = () => {

    return (
        <div className='App'>
            <div>
                <GeolocationInfo/>
                <WeatherInfo/>
            </div>
        </div>
    )
};

export default App;
