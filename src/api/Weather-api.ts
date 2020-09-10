import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather'
});


export const WeatherApi = {
    getWeather(lat: string, lon: string) {
        return instance.get(`?lat=${lat}&lon=${lon}&appid=8542c4d24ab24443daee592d6609c967&lang=ru&units=metric`)
            .then(response => {
                return response.data
            })
            .catch(e => console.log(e.message))
    }
};

