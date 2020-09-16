import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import React from "react";


export const LocalHistory = () => {
    const weatherHistory = useSelector<AppStateType, any>(state => state.weatherReducer.weatherLS);
    const mainHistory = useSelector<AppStateType, any>(state => state.weatherReducer.mainLS);
    const userAddressHistory = useSelector<AppStateType, any>(state => state.geolocationReducer.historyUserAddress);
    const dateInfo = useSelector<AppStateType, any>(state => state.weatherReducer.dateTimeLS);
    return (
        <div>
            <hr/>
            <div>
                {/*<div>*/}
                {/*    {weatherHistory.map((el: any) => {*/}
                {/*        return <p>{el.main}, {el.description}</p>*/}
                {/*    })}*/}
                {/*    {mainHistory.map((el: any) => {*/}
                {/*        return <p>{el}C{'\u00b0'}</p>*/}
                {/*    })}*/}
                {/*</div>*/}
                <div>
                    {userAddressHistory.map((el: any) => {
                        return <p>{el.GeoObject.description}</p>
                    })}
                    {dateInfo.map((el:any) => {
                        return <p>{el.year}.{el.month}.{el.day} {el.hours}:{el.minutes}</p>
                    })}
                </div>
            </div>
        </div>
    )
};




