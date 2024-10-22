export const BASE_URL = 'https://63d1501dd5f0fa7fbdc8c87c.mockapi.io'

export const BIKES_URL = BASE_URL + '/bikes'
export const BIKE_URL = (id: Number) => BIKES_URL + `/${id}`