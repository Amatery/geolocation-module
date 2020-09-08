import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getAddress, action} from "../redux/geolocation-info-reducer";
import {AppStateType} from "../redux/store";


const GeolocationInfo = () => {

    const dispatch = useDispatch();

    const {latitude, longitude} = useSelector((state: AppStateType) => state.geolocationReducer);

    const {description, name} = useSelector((state: AppStateType) => state.geolocationReducer.userAddress);


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    const getCoordinates = (position: any) => {
        const {latitude, longitude} = position.coords;
        dispatch(action.setCoordinatesSuccess(latitude, longitude));
        dispatch(getAddress(latitude, longitude))
    };

    const handleLocationError = (error: any) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log('User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                console.log('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                console.log('An unknown error occurred.');
                break;
            default:
                console.log('An unknown error occurred.');
        }
    };

    return (
        <div>
            <div>
                <h2>React Geolocation</h2>
                {/*<button onClick={getLocation}>Get coordinates</button>*/}
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
                <p>Address: {name} {description}</p>
            </div>
        </div>
    )
};


export default GeolocationInfo;