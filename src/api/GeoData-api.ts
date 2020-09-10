import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://geocode-maps.yandex.ru/1.x/',
});


export const getAddressApi = {
    getUserAddress(longitude: any, latitude: any) {
        return instance.get(`?format=json&apikey=78022481-7d79-48a9-9ba8-0e3dd224a924&geocode=${longitude},${latitude}`)
            .then(response => response.data)
    }
};

