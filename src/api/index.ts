import { BIKES_URL, BIKE_URL } from '@/constants/url'

export const getBikes = async () => {
    try {
        const response = await fetch(BIKES_URL, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        })
        let data 
        if (response.status >= 200 && response.status <= 299) {
            data = await response.json()
        } else {
            throw Error(response.statusText);
        }
        console.log(data)
        return {
            response: data,
            error: null,
            isLoad: true
        }
    } catch(error){
        return {
            response: {},
            error,
            isLoad: true
        }
    }
    
}

export const postBike = async (bike: any) => {
    try {
        const response = await fetch(BIKES_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...bike
            })
        })
        let data 
        if (response.status >= 200 && response.status <= 299) {
            data = await response.json()
        } else {
            throw Error(response.statusText);
        }    
        return {
            response: data,
            error: null,
            isLoad: true
        }
    } catch(error){
        return {
            response: {},
            error,
            isLoad: true
        }
    }
    
}

export const editBike = async (bike: any) => {
    try {
        const response = await fetch(BIKE_URL(bike.id), {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...bike
            })
        })
        let data 
        if (response.status >= 200 && response.status <= 299) {
            data = await response.json()
        } else {
            throw Error(response.statusText);
        }
        return {
            response: data,
            error: null,
            isLoad: true
        }
    } catch(error){
        return {
            response: {},
            error,
            isLoad: true
        }
    }
    
}

export const deleteBike = async (bike: any) => {
    try {
        const response = await fetch(BIKE_URL(bike.id), {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        })
        let data 
        if (response.status >= 200 && response.status <= 299) {
            data = await response.json()
        } else {
            throw Error(response.statusText);
        }
        return {
            response: data,
            error: null,
            isLoad: true
        }
    } catch(error){
        return {
            response: {},
            error,
            isLoad: true
        }
    }
    
}