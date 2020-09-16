import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import React from "react";


export const LocalHistory = () => {
    const weatherHistory = useSelector<AppStateType, any>(state => state.weatherReducer.weatherLS);
    const mainHistory = useSelector<AppStateType, any>(state => state.weatherReducer.mainLS);
    const userAddressHistory = useSelector<AppStateType, any>(state => state.geolocationReducer.historyUserAddress);
    return (
        <div>
            <div>
                Local history:
                    {weatherHistory.map((el: any) => {
                        return <span>{el.main}, {el.description}</span>
                    })}
                    {mainHistory.map((el: any) =>{
                        return <span>{el}C{'\u00b0'}</span>
                })}
                {userAddressHistory.map((el: any)=>{
                    return <span>{el.GeoObject.description}</span>
                })}
            </div>
        </div>
    )
};




