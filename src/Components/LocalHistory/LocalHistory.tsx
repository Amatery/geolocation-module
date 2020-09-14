import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import React from "react";


export const LocalHistory = () => {
    const weatherHistory = useSelector<AppStateType, any>(state => state.weatherReducer.weatherLS);
    return (
        <div>
            <div>
                Local history:
                {weatherHistory.map((el: any) => {
                    return <p>{el.main}, {el.description}</p>
                })}
            </div>
        </div>
    )
};




